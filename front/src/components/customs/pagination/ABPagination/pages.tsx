import React from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import ReactPaginate from 'react-paginate';
import { PaginationProps } from './pagination';

type Props = {
    pageInfo: PaginationProps,
    pageChange?: (page: number)=>void
}

const Pages = ({ pageInfo, pageChange }: Props) => {
   const {count}= pageInfo
    const handleClick = (event: any) => {
       
        pageChange ? pageChange(event.selected + 1) : {}
    }

    return (
        <>
            <ReactPaginate
                containerClassName="isolate inline-flex -space-x-px rounded-md shadow-sm select-none"
                pageLinkClassName="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                nextClassName="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                previousClassName="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                activeLinkClassName="relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20"
                breakClassName="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700"
                breakLabel="..."
                nextLabel={<ChevronRightIcon className="h-5 w-5" aria-hidden="true" />}
                onPageChange={handleClick}
                pageRangeDisplayed={0}
                pageCount={count}
                previousLabel={<ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />}

            />
        </>

       
    )
}

export default Pages