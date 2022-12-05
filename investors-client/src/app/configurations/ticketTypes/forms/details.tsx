import React from 'react'
import Card from '@/components/common/card';
import CardRight from '@/components/ui/cards/cardRight';
import { ticketTypeIdentifier } from '@/constants/options';



type Props = {
    code?: string
}

const TicketTypeDetails = ({code}:Props) => {
    return (

        <>
            <CardRight>
                <>
                    <span className='font-semibold'>  {ticketTypeIdentifier(code as string, "name")}</span>
                </>
            </CardRight>
        </>

    )
}

export default TicketTypeDetails