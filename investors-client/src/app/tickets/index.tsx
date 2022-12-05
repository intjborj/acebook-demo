import React from 'react'
import TicketMain from './ticketMain'
import HeaderDetails from '@/components/ui/headers/header-details';

type Props = {}

const TicketIndex = (props: Props) => {
  return (
    <div>
      <HeaderDetails
        title={'Tickets'}
        buttonName={'+ Create Ticket'}
        buttonRoute={'/tickets/form'}
      />
      
      <TicketMain />
    </div>
  )
}

export default TicketIndex