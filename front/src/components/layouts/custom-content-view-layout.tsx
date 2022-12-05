import React from 'react'



type Props = {
    children?: JSX.Element
}

const ViewContainer = ({children}: Props) => {
    return (
       
            <div className='pt-3 w-full grid place-items-center '>
                <div className="w-full sm:w-8/12 md:w-2/3">
                    {children}
                </div>
            </div>
        
    )
}

export default ViewContainer