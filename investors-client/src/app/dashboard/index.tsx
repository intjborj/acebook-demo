import React, { useEffect, useMemo, useState } from 'react'
import PostIndex from '@/app/posts';
import { useQuery } from '@apollo/client';
import { GET_POSTS } from '@graphql/operations/posts/postQueries';
import _ from 'lodash';
import { PostFormValues } from '@/types/posts/postTypes';
import { useModalState } from '@/components/ui/modal/modal.context';
// import { useModalState } from "@components/ui/modal/modal.context";

import PostTagIcon from '@/components/tags/tagIcon';
import { addPostTagLayout } from '@/services/posts';
import FeedHeader from '../common/feed/header';
import FeedPosts from '../common/feed/feedPosts';
import FeedPostLayout from '../common/feed/feedLayout';
import Spinner from '@/components/ui/loaders/spinner/spinner';
import { PostContextRd } from '@/reducers/posts/postContextRd';
import { getAuthCredentials } from '@/utils/auth-utils';

type Props = {
  departmentId?: string;
}

type StateType = {
  posts: any[];
  hasNewPost?: boolean;
}

const initialState = {
  posts: [],
  hasNewPost: true
}

const DashboardIndex = (props: Props) => {
  const [statePostRd, dispatchPostRd] = React.useContext<any>(PostContextRd)
  const [state, setState] = useState<StateType>(initialState)
  const { user } = getAuthCredentials(); 

  let queryVar = {
    departmentId: _.get(user, "departmentOnDuty._id"),
    type: null,
    user: _.get(user, "_id"),
    privacy: true,
    skip: 0,
  }

  const {
    isOpen
  } = useModalState();

  const { data: allPosts, refetch, loading: postLoading } = useQuery(GET_POSTS, {
    variables: queryVar,
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });

  const assignPost = () => {
    let allPostsTemp = _.cloneDeep(_.orderBy(_.get(allPosts, "posts.data"), ['created_at', 'updated_at'], ['desc', 'asc']))
    allPostsTemp = addPostTagLayout(allPostsTemp)
    setState((p) => ({ ...p, posts: allPostsTemp }))
  }

  useEffect(() => {
    assignPost()
  }, [allPosts])

  useEffect(() => {
    refetch(queryVar)
    assignPost()

    // setTimeout(() => {
    //   setState((p) => ({ ...p, hasNewPost: true }))
    //   setTimeout(() => {
    //     setState((p) => ({ ...p, hasNewPost: false }))
    //   }, 1000);
    // }, 500);

  }, [!statePostRd.active])

 

  return (
    <div>
      <FeedPostLayout>
        <FeedHeader />
        {/* {
          state.hasNewPost ?

            <div className='relative top-0'>
              <Spinner showText={false} />
            </div> 


            : */}
            <FeedPosts 
            posts={state.posts} 
            loading={postLoading} 
            refetch={refetch} 
            countAll={_.get(allPosts, "posts.paginatorInfo.count")} 
            currentPage={_.get(allPosts, "posts.paginatorInfo.currentPage")}
            refetchQuery={queryVar}
            />
        {/* } */}
      </FeedPostLayout>
    </div>
  )
}

export default DashboardIndex