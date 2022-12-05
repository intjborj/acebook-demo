import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client';
import { GET_POST } from '@graphql/operations/posts/postQueries';
import { useRouter } from 'next/router';
import PostIndex from '..';
import _ from 'lodash';
import ABTransition from '@/components/customs/transitions/ABTransition';
import Spinner from '@/components/ui/loaders/spinner/spinner';
import { PostContextRd } from '@/reducers/posts/postContextRd';
import { getAuthCredentials } from '@/utils/auth-utils';
import { addPostTagLayout } from '@/services/posts';
import { PostFormValues } from '@/types/posts/postTypes';

type Props = {}

type StateType = {
    posts: PostFormValues | null;
}

const initialState = {
    posts: null,
}

const SpecificPost = (props: Props) => {
    const { query } = useRouter();
    const { searchType, id: postId, ...restQuery } = query;
    const [statePostRd, dispatchPostRd] = React.useContext<any>(PostContextRd)
    const { user } = getAuthCredentials();
    const [state, setState] = useState<StateType>(initialState)

    const { data: specPost, refetch, loading } = useQuery(GET_POST, {
        variables: {
            id: postId,
            user: _.get(user, "_id"),
            type: "specific"
        },
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
    });

    const assignPost = () => {
        let allPostsTemp = _.cloneDeep(_.get(specPost, "post.data")) 
        allPostsTemp = addPostTagLayout([allPostsTemp])
        setState((p) => ({ ...p, posts: allPostsTemp[0], feedLoading: false }))
    }

    useEffect(() => {
        if (specPost) {
          assignPost()
        }
      }, [specPost])

    useEffect(() => {
        if (statePostRd.active == true) {

            refetch()
            dispatchPostRd({ type: "refetchPost", active: false })
        }

    }, [!statePostRd.active])

    return (
        <div>
            {
                loading == false ?
                    <>
                        {(specPost && _.get(specPost, "post.data") && state.posts ) ?
                            <ABTransition order={2} >
                                <PostIndex
                                    index={1}
                                    data={state.posts}
                                    // data={_.get(specPost, "post.data")}
                                    tags={_.get(state.posts, "tags")}
                                // tags={item.tags}
                                />
                            </ABTransition>
                            : <></>}
                    </> : <Spinner />
            }
        </div>
    )
}

export default SpecificPost