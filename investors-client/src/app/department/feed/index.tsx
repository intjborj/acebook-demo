import React, { useEffect, useMemo, useState } from 'react'
import { useQuery } from '@apollo/client';
import { GET_POSTS } from '@graphql/operations/posts/postQueries';
import _ from 'lodash';
import { useModalState } from '@/components/ui/modal/modal.context';
import { addPostTagLayout } from '@/services/posts';
import FeedHeader from '@/app/common/feed/header';
import FeedPosts from '@/app/common/feed/feedPosts';
import FeedPostLayout from '@/app/common/feed/feedLayout';
import PostFilters from '@/app/common/feed/filters/filters';
import Spinner from '@/components/ui/loaders/spinner/spinner';
import { getAuthCredentials } from '@/utils/auth-utils';
type Props = {
    departmentId?: string;
}

type StateType = {
    posts: any[];
    type: string;
}

const initialState = {
    posts: [],
    type: 'posts'
}

const DepartmentFeedIndex = (props: Props) => {
    const { token, permissions, id, user } = getAuthCredentials();
    const [state, setState] = useState<StateType>(initialState)

    const { isOpen } = useModalState();

    let queryVar = {
        departmentId: props.departmentId,
        type: state.type,
        user: null,
        privacy: false,
        skip: 0,
    }

    const { data: allPosts, refetch, loading: postLoading } = useQuery(GET_POSTS, {
        variables: queryVar,
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
    });

    // const { data: allPosts, refetch, loading: postLoading } = useQuery(GET_POSTS, {
    //     variables: {
    //         departmentId: props.departmentId,
    //         type: state.type
    //     },
    //     fetchPolicy: 'cache-and-network',
    //     nextFetchPolicy: 'cache-first',
    // });

    const assignPost = () => {

        let allPostsTemp = _.cloneDeep(_.orderBy(_.get(allPosts, "posts.data"), ['created_at', 'updated_at'], ['desc', 'asc']))

        allPostsTemp = addPostTagLayout(allPostsTemp)

        setState((p) => ({ ...p, posts: allPostsTemp }))
    }

    useEffect(() => {
        assignPost()
    }, [allPosts])

    useEffect(() => {

        refetch()
        assignPost()
    }, [!isOpen])

    const filterBtnClicked = (data: any) => {
      
        setState((p) => ({ ...p, type: data }))

        setTimeout(() => {
            refetch()
        }, 100);

    }




    return (
        <div>
            <FeedPostLayout>
                <FeedHeader />
                <PostFilters clicked={filterBtnClicked} />
                {/* <FeedPosts
                    posts={state.posts}
                    loading={postLoading}
                    refetch={refetch}
                    countAll={_.get(allPosts, "posts.paginatorInfo.count")}
                    currentPage={_.get(allPosts, "posts.paginatorInfo.currentPage")}
                    departmenId={props.departmentId}
                    type={state.type}
                /> */}

                <FeedPosts
                    posts={state.posts}
                    loading={postLoading}
                    refetch={refetch}
                    countAll={_.get(allPosts, "posts.paginatorInfo.count")}
                    currentPage={_.get(allPosts, "posts.paginatorInfo.currentPage")}
                    refetchQuery={queryVar}
                    departmenId={props.departmentId}
                    type={state.type}
                />

                {/* <FeedPosts posts={state.posts} loading={postLoading} /> */}
            </FeedPostLayout>
        </div>
    )
}

export default DepartmentFeedIndex