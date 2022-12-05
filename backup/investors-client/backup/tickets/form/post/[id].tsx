import React, { useEffect, useState } from 'react'
import type { NextPageWithLayout } from '@/types';
import { getLayout } from '@/components/layouts/layout';
import ModIndexClassicLayout from '@/components/layouts/mod-index-classic';
import DashboardIndex from '@/app/dashboard';
import { adminOnly } from '@/utils/auth-utils';
import PromotionSliders from '@/components/promotions/promotions';
import TicketForm from '@/app/tickets/form';
import ModClassicLayout from '@/components/layouts/mod-classic';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_POSTS } from '@graphql/operations/posts/postQueries';
import _ from 'lodash';

import { getAuthCredentials } from '@/utils/auth-utils';
import Spinner from '@/components/ui/loaders/spinner/spinner';
import { TicketFormValues } from '@/types/tickets/ticketType';
import moment from 'moment';
type Props = {}
type StateType = {
  postDef?: any;
  loading?: boolean;
}

const breadcrumbs = [
  {
    title: 'Posts',
    route: '/',
    isHome: true,
  },
  {
    title: 'Create Ticket',
    route: '',
    isCurrent: true,
  },
];


const PostTicketForm: NextPageWithLayout = () => {
  const { user } = getAuthCredentials();
  const { query } = useRouter();
  const { searchType, id, ...restQuery } = query;
  const [state, setState] = useState<StateType>({
    postDef: {},
    loading: true
  })

  let queryVar = {
    _id: id,
    skip: 0,
  }

  const { data: allPosts, refetch, loading: postLoading } = useQuery(GET_POSTS, {
    variables: queryVar,
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });



  useEffect(() => {

    if (allPosts) {
      let postDefault = {
        requestedBy: _.get(allPosts, "posts.data[0].createdBy"),
        createdBy: user ,
        description: _.get(allPosts, "posts.data[0].content"),
        dateRequested: moment( _.get(allPosts, "posts.data[0].created_at")).format('YYYY-MM-DD'),
        requestingDepartment: _.get(allPosts, "posts.data[0].createdBy.departmentOnDuty"),
        serviceDepartment: _.get(user, "departmentOnDuty"),
        postOrigin: _.get(allPosts, "posts.data[0]._id")
      }
      setState((p)=>({...p, postDef: postDefault}))
      
      setTimeout(() => {
        setState((p)=>({...p, loading: false}))
      }, 100);
    }

  }, [allPosts])


  return (
    <>
      <ModClassicLayout breadcrumb={breadcrumbs}>
        <>
         {state.loading ? <Spinner /> : <TicketForm postDefault={state.postDef} />} 
        </>
      </ModClassicLayout>
    </>
  )
}
PostTicketForm.getLayout = getLayout;

PostTicketForm.authenticate = {
  permissions: adminOnly,
};

export default PostTicketForm