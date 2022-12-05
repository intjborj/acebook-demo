import React, { useEffect, useMemo, useState } from 'react'
import PostIndex from '@/app/posts';
import { useQuery } from '@apollo/client';
import { GET_POSTS } from '@graphql/operations/posts/postQueries';
import _, { isEmpty } from 'lodash';
import { PostFormValues } from '@/types/posts/postTypes';
import { useModalState } from '@/components/ui/modal/modal.context';
// import { useModalState } from "@components/ui/modal/modal.context";

import PostTagIcon from '@/components/tags/tagIcon';
import { addPostTagLayout } from '@/services/posts';
import FeedHeader from '@/app/common/feed/header';
import FeedPosts from '@/app/common/feed/feedPosts';
import FeedPostLayout from '@/app/common/feed/feedLayout';
import Spinner from '@/components/ui/loaders/spinner/spinner';
import { PostContextRd } from '@/reducers/posts/postContextRd';
import { getAuthCredentials } from '@/utils/auth-utils';
import SmallLoader from '@/components/ui/loaders/smallLoader';
import ABTransition from '@/components/customs/transitions/ABTransition';
import NoData from '@/components/customs/information/noData';
import PostMenu from '@/app/common/feed/filters/filters';
import HeaderDetails from '@/components/ui/headers/header-details';
import { FilterFields } from '@/components/customs/forms/ABFormFilter';
import NewFunction from '@/components/customs/information/newFunction';
import { LabelColor } from '@/constants/enums/themes';
import FeedPagination from '../common/feed/pagination';
import LazyLoad from 'react-lazyload';



export type PostQueryType = {
  departmentId?: string | undefined | null,
  type?: string,
  user?: string | undefined | null,
  privacy?: boolean | undefined | null,
  skip?: number,
  page: number,
  perPage?: number,
}


type Props = {
  departmentId?: string;
  queryVar?: PostQueryType;
  hasMenu?: boolean;
  menuDisplay?: string[];
}

type StateType = {
  posts: any[];
  hasNewPost?: boolean;
  feedLoading?: boolean;
  searchText?: string | null;
}

const initialState = {
  posts: [],
  hasNewPost: true,
  feedLoading: false,
  searchText: null
}

const isCommingSoon = false

const PostFeedIndex = ({ queryVar, hasMenu, menuDisplay }: Props) => {
  const [statePostRd, dispatchPostRd] = React.useContext<any>(PostContextRd)
  const [state, setState] = useState<StateType>(initialState)
  const { user } = getAuthCredentials();

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
    setState((p) => ({ ...p, posts: allPostsTemp, feedLoading: false }))
  }


  useEffect(() => {
    if (allPosts) {
      assignPost()
    }
  }, [allPosts])

  // useEffect(() => {
  //   refetch(queryVar)
  //   assignPost()
  // }, [!statePostRd.active])
  useEffect(() => {
    if (statePostRd.active == true) {
      refetch(queryVar)
      assignPost()
      dispatchPostRd({ type: "refetchPost", active: false })
    }

  }, [!statePostRd.active])



  const handleSearch = (data: any) => {
    if (queryVar) {
      setState((p) => ({ ...p, feedLoading: true, searchText: data }))
      refetch({
        ...queryVar,
        ...{
          searchArg: {
            isSearch: true,
            description: data,
          }
        }
      })
    }
  }

  const handleFilter = (data: any) => {

    if (queryVar) {
      setState((p) => ({ ...p, feedLoading: true }))
      refetch({
        ...queryVar,
        ...{
          searchArg: {
            isSearch: true,
            description: state.searchText,
            startDate: data.startDate,
            endDate: data.endDate,
          }
        }
      })
    }

  }

  const paginate = (data: any) => {

    let newQuery: PostQueryType | any = _.cloneDeep(queryVar);
    newQuery.page = data as number
    let payload = newQuery


    if (!isEmpty(state.searchText)) {
      payload = {
        ...payload,
        ...{
          searchArg: {
            isSearch: true,
            description: state.searchText
          }
        }
      }
    }

    refetch(payload)

  }

  return (
    <div>
      {/* <LazyLoad height={100}> */}
        {
          isCommingSoon ?
            <div className={`${LabelColor.SECONDARY} font-bold`} >
              <NewFunction />
              <span className='flex pt-2 justify-center'>
                Post Feature is Comming Soon!
              </span>
            </div>
            :
            <FeedPostLayout>
              <FeedHeader
                // filterFields={[FilterFields.DATE_RANGE]}
                searchInput={handleSearch}
              // filterInput={handleFilter}
              />
              {state.feedLoading || postLoading ?
                <ABTransition>
                  <div className='flex justify-center scale-105'>  <SmallLoader /></div>
                </ABTransition>
                : <></>}

              {menuDisplay && menuDisplay?.length > 0 ? <PostMenu menuDisplay={menuDisplay} /> : <></>}
              <>
                {/* <FeedPosts
                posts={state.posts}
                loading={postLoading}
                refetch={refetch}
                countAll={_.get(allPosts, "posts.paginatorInfo.count")}
                currentPage={_.get(allPosts, "posts.paginatorInfo.currentPage")}
                refetchQuery={queryVar}
              /> */}
                <FeedPagination
                  postData={state.posts}
                  paginationInfo={_.get(allPosts, "posts.paginatorInfo")}
                  pageChange={paginate}
                />
              </>
            </FeedPostLayout>
        }
      {/* </LazyLoad> */}
    </div>
  )
}

export default PostFeedIndex