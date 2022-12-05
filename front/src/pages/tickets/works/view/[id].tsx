// Dependecies
import React, { useEffect } from 'react'
import _ from 'lodash'
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
// Constants
import { FrontPath } from '@/constants/enums/paths';
import { GET_SPECTICKET_SPECWORK} from '@graphql/operations/tickets/ticketQueries';
import { adminOnly } from '@/utils/auth-utils';
import type { NextPageWithLayout } from '@/types';
// Hooks
import { PostContextRd } from '@/reducers/posts/postContextRd';
// Custom Components
import NoData from '@/components/customs/information/noData';
import { getLayout } from '@/components/layouts/layout';
import ModClassicLayout from '@/components/layouts/mod-classic';
import Spinner from '@/components/ui/loaders/spinner/spinner';
import WorkViewApp from '@/app/tickets/works/view';
import ABTransition from '@/components/customs/transitions/ABTransition';

const WorkFormAddIndex: NextPageWithLayout = () => {
  const { query } = useRouter();
  const { searchType, id: workId, ...restQuery } = query;
  const [statePostRd, dispatchPostRd] = React.useContext<any>(PostContextRd)


  const { data: dataWork, refetch, loading } = useQuery(GET_SPECTICKET_SPECWORK, {
    variables: {
      id: restQuery?.mn,
      workId: workId
    },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });
 

  const breadcrumbs = [
    {
      title: 'Tickets',
      route: FrontPath.TICKETS,
      isHome: true,
    },
    {
      title: 'Ticket Origin',
      route: `${FrontPath.TICKET_VIEW}/${restQuery?.mn}`,
    },
    {
      title: 'Work View',
      route: '#',
      isCurrent: true,
    },
  ];

  useEffect(() => {
    refetch()
  }, [!statePostRd.active])



  return (
    <>
      <ModClassicLayout breadcrumb={breadcrumbs}>
        <>
          {
            loading ? <Spinner /> :
              <>
                {
                  _.get(dataWork, "ticketWork.data") && _.get(dataWork, "ticketWork.data.works[0]") &&  dataWork?
                    <ABTransition>
                      <WorkViewApp ticketData={_.get(dataWork, "ticketWork.data")} workData={_.get(dataWork, "ticketWork.data.works[0]")} />
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
WorkFormAddIndex.getLayout = getLayout;

WorkFormAddIndex.authenticate = {
  permissions: adminOnly,
};

export default WorkFormAddIndex