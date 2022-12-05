import Pages from "./pages"
import React, { useState } from 'react'
import PaginationDetails from "./paginationDetails";

export type PaginationProps = {
    total: number;
    perPage?: number;
    lastItem?: number;
    firstItem?: number;
    count: number;
}

type Props = {
    data: PaginationProps,
    pageChange?: (page: number) => void,
}

type StateType = {
    currentPage: number;
}
export default function Pagination({ data, pageChange }: Props) {
    const [state, setState] = useState<StateType>({
        currentPage: 1
    })
    const {  count } = data

    const handlePageChange = (type: string) => {
        let newPage = state.currentPage
        if (type == "next") {
            newPage += 1;
        } else if (type == "prev") {
            newPage -= 1;
        }

        setState((p) => ({ ...p, currentPage: newPage }))
        pageChange ? pageChange(newPage) : {}
    }

    return (
        <div className="flex items-center justify-between rounded-xl bg-white px-4 py-3 sm:px-6 drop-shadow-xl">
            {/* <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"> */}
            <div className="grid grid-cols-3 sm:hidden w-full">
                {/* <div className="flex flex-1 justify-between sm:hidden"> */}
                <div className="flex justify-start">
                    {
                        state.currentPage - 1 >= 1 &&
                        <a
                            onClick={() => handlePageChange('prev')}
                            href="#"
                            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Previous
                        </a>
                    }
                </div>
                <div className="scale-75 w-full text-center">
                    <PaginationDetails data={data} />
                </div>
                <div className="flex justify-end">
                    {
                        state.currentPage + 1 <= count &&
                        <a
                            onClick={() => handlePageChange('next')}
                            href="#"
                            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Next
                        </a>
                    }
                </div>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                {/* <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{firstItem}</span> to <span className="font-medium">{lastItem}</span> of{' '}
                        <span className="font-medium">{total}</span> results
                    </p>
                </div> */}
                <PaginationDetails data={data} />
                <Pages pageInfo={data} pageChange={pageChange} />
            </div>
        </div>
    )
}
