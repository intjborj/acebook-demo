import PostIndex from '@/app/posts'
import ABPagination from '@/components/customs/pagination/ABPagination'
import { PaginationProps } from '@/components/customs/pagination/ABPagination/pagination'
import ABTransition from '@/components/customs/transitions/ABTransition'
import SkeletonLoader from '@/components/ui/loaders/skeleton-loader'
import { PostFormValues } from '@/types/posts/postTypes'
import React from 'react'
import PostList from './postList'
import LazyLoad from 'react-lazyload';
// const PostIndex = React.lazy(() => import('@/app/posts'));
// const ABPagination = React.lazy(() => import('@/components/customs/pagination/ABPagination'));
type Props = {
    postData?: PostFormValues[]
    paginationInfo?: PaginationProps,
    pageChange?: (page: any) => void
}

const FeedPagination = ({ postData, paginationInfo, pageChange }: Props) => {
    return (
        <div>
            <>
                {/* <Suspense fallback={
                    <SkeletonLoader />
                }> */}
                    <LazyLoad height={50}>
                        {
                            postData && postData.map((item: PostFormValues, index: number) => (
                                <div key={index}>

                                    <PostIndex
                                        isFeed={true}
                                        index={index}
                                        data={item}
                                        tags={item.tags}
                                    />

                                </div>

                            ))
                        }
                    </LazyLoad>
                    {(paginationInfo && postData && postData.length > 0) &&
                        <ABTransition>
                            <ABPagination containerClass='md:w-full' pageInfo={paginationInfo as PaginationProps} pageChange={pageChange} />
                        </ABTransition>
                    }
                {/* </Suspense> */}

            </>
        </div>
    )
}

export default FeedPagination