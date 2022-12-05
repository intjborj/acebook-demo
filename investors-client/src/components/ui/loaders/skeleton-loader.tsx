import React from 'react'

type Props = {}

const SkeletonLoader = (props: Props) => {
    return (
        <div>
            <div className="w-full h-24 border-2 rounded-md mx-auto mt-5">
                <div className="flex animate-pulse flex-row items-center h-full justify-center space-x-5">
                    <div className="w-12 bg-gray-300 h-12 rounded-full ">
                    </div>
                    <div className="flex flex-col space-y-3">
                        <div className=" w-36 md:w-96 bg-gray-300 h-6 rounded-md ">
                        </div>
                        <div className="w-24 md:w-52 bg-gray-300 h-6 rounded-md ">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SkeletonLoader