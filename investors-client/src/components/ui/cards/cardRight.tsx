import React from 'react'
import Card from '@/components/common/card';
type Props = {
    children : JSX.Element
}

const CardRight = ({children} : Props) => {
    return (

        <div className="my-5 flex flex-wrap sm:my-8 justify-end">
           
            <Card className="w-full sm:w-8/12 md:w-2/3">
                <div className="grid  gap-3 md:grid-cols-1 lg:grid-cols-1">
                </div>
                   {children}
            </Card>
        </div>

    )
}

export default CardRight