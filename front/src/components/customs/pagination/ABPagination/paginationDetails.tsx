import React from 'react'
import { PaginationProps } from './pagination'

type Props = {
    data: PaginationProps,
}

const PaginationDetails = ({data}: Props) => {
    const {firstItem, lastItem, total}= data
    return (
        <div>
            <div>
                <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{firstItem && firstItem >= 1 ? firstItem : 0 }</span> to <span className="font-medium">{lastItem}</span> of{' '}
                    <span className="font-medium">{total}</span> results
                </p>
            </div>
        </div>
    )
}

export default PaginationDetails