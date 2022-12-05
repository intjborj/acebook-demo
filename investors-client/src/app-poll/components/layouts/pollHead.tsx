import React from 'react'
import Card from '@/components/ui/cards/card'

type Props = {
    period?: string;
}

const PollHead = ({period}: Props) => {
    return (
        <div>
            <div className='flex justify-center absolute inset-0 '>
                <Card className='bg-gradient-to-r from-teal-500 h-fit to-cyan-600 w-11/12 shadow-lg shadow-cyan-500/50'>
                    <span className=' text-white flex justify-center'>
                        <div className=' inline-grid grid-cols-1'>
                            <span className='font-extrabold text-3xl flex justify-center'>ACEMC-BOHOL</span>
                            <span className='text-lg font-semibold flex justify-center'> BOD ELECTION {period}</span>
                        </div>
                    </span>
                </Card>
            </div>
        </div>
    )
}

export default PollHead