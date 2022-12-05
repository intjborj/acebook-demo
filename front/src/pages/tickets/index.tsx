// Dependencies
import React from 'react'
// Constants
import type { NextPageWithLayout } from '@/types';
import { adminOnly } from '@/utils/auth-utils';
// Custom Components
import { getLayout } from '@/components/layouts/layout';
import ModClassicLayout from '@/components/layouts/mod-classic';
import TicketIndex from '@/app/tickets';

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