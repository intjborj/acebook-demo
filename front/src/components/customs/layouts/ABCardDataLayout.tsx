import React from 'react'

type Props = {
    children?: any
}

const ABCardDataLayout = ({children}: Props) => {
    return (
        <div className='flex justify-center'>
            <div className='grid grid-cols-1 gap-2 w-full  md:w-2/3'>
                {children}
            </div>
        </div>
    )
}

export default ABCardDataLayout