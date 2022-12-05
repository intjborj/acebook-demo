import React from 'react'
import type { NextPageWithLayout } from '@/types';
import { getLayout } from '@/components/layouts/layout';
import ModIndexClassicLayout from '@/components/layouts/mod-index-classic';
import { adminOnly } from '@/utils/auth-utils';
import HeaderDetails from '@/components/ui/headers/header-details';
import ModClassicLayout from '@/components/layouts/mod-classic';
import TicketIndex from '@/app/tickets';


type Props = {}



const variables = {
  type: 'grocery',
}
const Tickets: NextPageWithLayout = () => {

  
  return (
    <>
      <ModClassicLayout>
        <>
          <TicketIndex />
        </>
      </ModClassicLayout>
    </>
  )
}
Tickets.getLayout = getLayout;

Tickets.authenticate = {
  permissions: adminOnly,
};

export default Tickets