import React, {useState, useEffect} from 'react'
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
import { GET_ALL_TICKETS, GET_SPEC_TICKET } from '@graphql/operations/tickets/ticketQueries';
import Spinner from '@/components/ui/loaders/spinner/spinner';
import _ from 'lodash';
import { TicketFormValues } from '@/types/tickets/ticketType';
import { ticketStatusIdentifier, ticketTypeIdentifier } from '@/constants/options';


type StateType = {
  ticketDef?: any;
  loading?: boolean;
}


const breadcrumbs = [
  {
    title: 'Tickets',
    route: '/tickets',
    isHome: true,
  },
  {
    title: 'Update',
    route: '',
    isCurrent: true,
  },
];

const UpdateTicket: NextPageWithLayout = () => {
  const { query } = useRouter();
  const { searchType, id, ...restQuery } = query;
 
  const [state, setState] = useState<StateType>({
    ticketDef: {},
    loading: true
  })

  const { data: dataTickets, refetch } = useQuery(GET_SPEC_TICKET, {
    variables: {
      id: id
    },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });


  const restructureApprUsr = (data:any)=>{

    let result = null 

    if(data){
        result = data.map((item : any)=>{
          return item.user
        })
    }

    return result

  }
  

  useEffect(() => {

    if (dataTickets) {
    
      let cloneData  = _.cloneDeep(_.get(dataTickets,"tickets.data[0]"))
      cloneData.type = ticketTypeIdentifier(_.get(dataTickets,"tickets.data[0].type"), "object")
      cloneData.postOrigin =  _.cloneDeep(_.get(dataTickets,"tickets.data[0].postOrigin._id"))
      cloneData.status = ticketStatusIdentifier(_.get(dataTickets,"tickets.data[0].status"), "object")
      cloneData.approvers_temp = restructureApprUsr(_.get(dataTickets,"tickets.data[0].approvers"))

      // let postDefault = {
      //   requestedBy: _.get(allPosts, "posts.data[0].createdBy"),
      //   createdBy: user ,
      //   description: _.get(allPosts, "posts.data[0].content"),
      //   dateRequested: moment( _.get(allPosts, "posts.data[0].created_at")).format('YYYY-MM-DD'),
      //   requestingDepartment: _.get(allPosts, "posts.data[0].createdBy.departmentOnDuty"),
      //   serviceDepartment: _.get(user, "departmentOnDuty"),
      //   postOrigin: _.get(allPosts, "posts.data[0]._id")
      // }
      setState((p)=>({...p, ticketDef:cloneData }))
      
      setTimeout(() => {
        setState((p)=>({...p, loading: false}))
      }, 100);
    }

  }, [dataTickets])



  return (
    <>
      <ModClassicLayout breadcrumb={breadcrumbs}>
        <>
        {state.loading ? <Spinner /> : <TicketForm postDefault={state.ticketDef} />} 
        </>
      </ModClassicLayout>
    </>
  )
}
UpdateTicket.getLayout = getLayout;

UpdateTicket.authenticate = {
  permissions: adminOnly,
};

export default UpdateTicket