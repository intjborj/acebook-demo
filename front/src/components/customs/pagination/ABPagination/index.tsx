import React from 'react'
import Pagination, { PaginationProps } from './pagination'

type Props = {
  pageInfo:PaginationProps,
  pageChange?: (page: number)=>void,
  containerClass?: string,
}

const ABPagination = ({pageInfo, pageChange, containerClass}: Props) => {
  return (
    <div>
      <div className='pt-3'>
        <div className='flex justify-center'>
          <div className={`grid grid-cols-1 gap-2 w-full  md:w-2/3 ${containerClass ?? ''}`}>
            <Pagination data={pageInfo} pageChange={pageChange} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ABPagination