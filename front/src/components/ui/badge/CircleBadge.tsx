import React from 'react'

type Props = {
    content?: string | number | null;
}

const CircleBadge = ({content}: Props) => {
    return (
        <div>
            <span className="flex">
                <span className="animate-ping absolute -top-1 -right-1 inline-flex w-4 h-4 rounded-full bg-red-400 opacity-75"></span>
                <div className=" inline-flex absolute -top-2 -right-2 justify-center items-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full border-2 border-white dark:border-gray-900">{content}</div>
            </span>
        </div>
    )
}

export default CircleBadge