// Dependencies
import React from 'react'
import { useRouter } from 'next/router';
// Contants
import type { NextPageWithLayout } from '@/types';
import { FrontPath } from '@/constants/enums/paths';
import { adminOnly } from '@/utils/auth-utils';
// Custom Components
import { getLayout } from '@/components/layouts/layout';
import ModClassicLayout from '@/components/layouts/mod-classic';
import WorkFormApp from '@/app/tickets/works/form';

const WorkFormAddIndex: NextPageWithLayout = () => {
  const { query } = useRouter();
  const { searchType, id: ticketId, ...restQuery } = query;

  const breadcrumbs = [
    {
      title: 'Tickets',
      route: FrontPath.TICKETS,
      isHome: true,
    },
    {
      title: 'Ticket Origin',
      route: `${FrontPath.TICKET_VIEW}/${ticketId}`,
    },
    {
      title: 'Work Form',
      route: '#',
      isCurrent: true,
    },
  ];

  return (
    <>
      <ModClassicLayout breadcrumb={breadcrumbs}>
        <>
          <WorkFormApp ticketId={ticketId as string} isAdd={true} />
        </>
      </ModClassicLayout>
    </>
  )
}
WorkFormAddIndex.getLayout = getLayout;

WorkFormAddIndex.authenticate = {
  permissions: adminOnly,
};

export default WorkFormAddIndex