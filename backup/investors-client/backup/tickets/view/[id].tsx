import React, {useEffect} from 'react'
import type { NextPageWithLayout } from '@/types';
import { getLayout } from '@/components/layouts/layout';
import { adminOnly } from '@/utils/auth-utils';
import TicketForm from '@/app/tickets/form';
import ModClassicLayout from '@/components/layouts/mod-classic';
import ViewTicketApp from '@/app/tickets/view';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import {  GET_SPEC_TICKET } from '@graphql/operations/tickets/ticketQueries';
import Spinner from '@/components/ui/loaders/spinner/spinner';
import { PostContextRd } from '@/reducers/posts/postContextRd';
const breadcrumbs = [
  {
    title: 'Tickets',
    route: '/tickets',
    isHome: true,
  },
  {
    title: 'View',
    route: '#',
    isCurrent: true,
  },
];

const ViewTicket: NextPageWithLayout = () => {
  const { query } = useRouter();
  const { searchType, id, ...restQuery } = query;
  const [statePostRd, dispatchPostRd] = React.useContext<any>(PostContextRd)

  const { data: dataTickets, refetch , loading} = useQuery(GET_SPEC_TICKET, {
    variables: {
      id: id
    },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });

  useEffect(() => {
    refetch()
  }, [!statePostRd.active])

 
  return (
    <>
      <ModClassicLayout breadcrumb={breadcrumbs}>
        <>
        {loading? <Spinner/> :  <ViewTicketApp data={dataTickets} />}
        </>
      </ModClassicLayout>
    </>
  )
}
ViewTicket.getLayout = getLayout;

ViewTicket.authenticate = {
  permissions: adminOnly,
};

export default ViewTicket