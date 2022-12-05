import Card from '@/components/ui/cards/card'
import React from 'react'

type Props = {
    children?: JSX.Element | JSX.Element[]
}

const SpecCandidateLayout = ({ children }: Props) => {
    return (
        <div >
            <div className='bg-light drop-shadow-lg rounded flex p-3 mb-3 w-full '>
                {children}
            </div>
        </div>
    )
}

export default SpecCandidateLayout