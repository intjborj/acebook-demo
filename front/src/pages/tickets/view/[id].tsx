// Dependencies
import React, { useEffect, useMemo } from 'react'
import _ from 'lodash';
import { useRouter } from 'next/router';
// import { useQuery } from '@apollo/client';
// Constants
import type { NextPageWithLayout } from '@/types';
import { GET_SPEC_TICKET_AGG } from '@graphql/operations/tickets/ticketQueries';
import { PostContextRd } from '@/reducers/posts/postContextRd';
import { adminOnly } from '@/utils/auth-utils';
// Customs Components
import Spinner from '@/components/ui/loaders/spinner/spinner';
import ModClassicLayout from '@/components/layouts/mod-classic';
import { getLayout } from '@/components/layouts/layout';
import ABTransition from '@/components/customs/transitions/ABTransition';
import NoData from '@/components/customs/information/noData';
import ViewTicketApp from '@/app/tickets/view';
import { useQuery, useLazyQuery } from '@apollo/client';

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

  const { data: dataTickets, refetch, loading } = useQuery(GET_SPEC_TICKET_AGG, {
    variables: {
      id: id
    },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });
  // const [getTicketView, { error, data: dataTickets, loading }] = useLazyQuery(GET_SPEC_TICKET_AGG);

  useMemo(() => {
    // if (!statePostRd.active) {
    refetch()
    // getTicketView({
    //   variables: {
    //     id: id
    //   }
    // })
    // dispatchPostRd({ type: "refetch", modalData: false })
    // }
  }, [!statePostRd.active])
  
  return (
    <>
      <ModClassicLayout breadcrumb={breadcrumbs}>
        <>
          {
            loading ? <Spinner /> :
              <>
                {
                  _.get(dataTickets, "ticket.data") && dataTickets ?
                    <ABTransition>
                      <ViewTicketApp data={_.get(dataTickets, "ticket.data")} ticketTypeData={_.get(dataTickets, "ticket.ticketTypeData")} />
                    </ABTransition>
                    :
                    <NoData />
                }

              </>
          }
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