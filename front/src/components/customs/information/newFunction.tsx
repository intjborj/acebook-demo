import Image from 'next/image'
import React from 'react'
import ABTransition from '../transitions/ABTransition'

type Props = {}

const NewFunction = (props: Props) => {
    return (
        <ABTransition>
            <div className='h-full flex justify-center pt-10'>
                <div className='grid grid-cols-1'>
                    <div className='flex justify-center '>
                        <img
                            src={'/icons/info/new-function.svg'}
                            // src={'/img/nodata.png'}
                            width={"100%"}
                            height={"100%"}
                            // layout="responsive"
                        />
                    </div>
                    {/* <div className='flex justify-center '>
                        <h1 className="mb-4 text-lg font-bold text-gray-900 dark:text-white md:text-lg  "><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Sorry,</span> No data available</h1>
                    </div> */}
                </div>
            </div>
        </ABTransition>
    )
}

export default NewFunction