import React from 'react'
import type { NextPageWithLayout } from '@/types';
import { getLayout } from '@/components/layouts/layout';
import ModIndexClassicLayout from '@/components/layouts/mod-index-classic';
import { adminOnly } from '@/utils/auth-utils';
import HeaderDetails from '@/components/ui/headers/header-details';
import ModClassicLayout from '@/components/layouts/mod-classic';
import TicketIndex from '@/app/tickets';
// import InvestorsApp from '@/app/investors';


type Props = {}



const variables = {
  type: 'grocery',
}
const InvestorsIndex: NextPageWithLayout = () => {

  
  return (
    <>
      <ModClassicLayout>
        <>
        {/* <InvestorsApp/> */}
        </>
      </ModClassicLayout>
    </>
  )
}
InvestorsIndex.getLayout = getLayout;

InvestorsIndex.authenticate = {
  permissions: adminOnly,
};

export default InvestorsIndex