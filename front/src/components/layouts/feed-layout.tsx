import React from 'react'

type Props = {
    children: any
}

const Feedlayout = ({ children }: Props) => {
    return (
        <div className=''>
            <div className='w-3/4 '>
                {/* <div className="w-full "> */}
                <div className="bg-gray mx-6 md:mx-14 ">

                    <div className="bg-gray min-h-screen  ">
                        <div className="mx-auto flex w-full max-w-none flex-col  pt-3">
                            {children}
                        </div>
                    </div>

                </div>
                {/* </div> */}
            </div>
        </div>
    )
}

export default Feedlayout