import React from 'react'

type Props = {
    data?: number
}

const PollVotesLayout = ({data}: Props) => {

    
    return (
        <div>
            <h1 className="flex items-center text-2xl font-extrabold text-teal-800 justify-center">Votes Available<span className="bg-blue-100 text-blue-800 text-2xl font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-2">{data}</span></h1>
            {/* <h1 className="flex items-center text-2xl font-extrabold dark:text-white justify-center">Votes Available<span className="bg-blue-100 text-blue-800 text-2xl font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-2">100</span></h1> */}
        </div>
    )
}

export default PollVotesLayout