import React from 'react'
import type { NextPageWithLayout } from '@/types';
import { getLayout } from '@/components/layouts/layout';
import ModIndexClassicLayout from '@/components/layouts/mod-index-classic';
import DashboardIndex from '@/app/dashboard';
import { adminOnly } from '@/utils/auth-utils';
import PromotionSliders from '@/components/promotions/promotions';
import TicketForm from '@/app/tickets/form';
import ModClassicLayout from '@/components/layouts/mod-classic';

const breadcrumbs = [
  {
    title: 'Tickets',
    route: '/tickets',
    isHome: true,
  },
  {
    title: 'Create',
    route: '/tickets/form',
    isCurrent: true,
  },
];

const CreateTicketForm: NextPageWithLayout = () => {
 
  return (
    <>
      <ModClassicLayout breadcrumb={breadcrumbs}>
        <>
          <TicketForm />
        </>
      </ModClassicLayout>
    </>
  )
}
CreateTicketForm.getLayout = getLayout;

CreateTicketForm.authenticate = {
  permissions: adminOnly,
};

export default CreateTicketForm