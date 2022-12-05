// Dependencies
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import _ from 'lodash';
// Constants
import type { NextPageWithLayout } from '@/types';
import { TicketUploadPath } from '@/constants/uploadPaths';
import {  ticketTypeIdentifier } from '@/constants/options';
import { adminOnly } from '@/utils/auth-utils';
import {  GET_SPEC_TICKET } from '@graphql/operations/tickets/ticketQueries';
// Hooks
import { extractFileBlobDynamic } from '@/services/extractions';
// Custom Components
import { getLayout } from '@/components/layouts/layout';
import TicketForm from '@/app/tickets/form';
import ModClassicLayout from '@/components/layouts/mod-classic';
import Spinner from '@/components/ui/loaders/spinner/spinner';

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


  const restructureApprUsr = (data: any) => {

    let result = null

    if (data) {
      result = data.map((item: any) => {
        return item.user
      })
    }
    return result

  }

  const defaultValProcess = async () => {
    let cloneData = _.cloneDeep(_.get(dataTickets, "tickets.data[0]"))
    let getAttBlob: any[] = []

    if (_.get(dataTickets, "tickets.data[0].attachments")) {
      getAttBlob = await extractFileBlobDynamic({
        attachments: _.get(dataTickets, "tickets.data[0].attachments"),
        type: "tickets",
        completePath: TicketUploadPath({ code: _.get(dataTickets, "tickets.data[0].code") })
      })
      let modAtt = getAttBlob.map((item: any) => {
        item.isOld = 1

        return item
      })

      cloneData.attachments_image = getAttBlob
    }


    cloneData.type = _.get(dataTickets, "tickets.data[0].typeId")
    // cloneData.type = ticketTypeIdentifier(_.get(dataTickets, "tickets.data[0].type"), "object")
    cloneData.postOrigin = _.cloneDeep(_.get(dataTickets, "tickets.data[0].postOrigin._id"))
    cloneData.status = _.get(dataTickets, "tickets.data[0].status")
    // cloneData.status = ticketStatusIdentifier(_.get(dataTickets,"tickets.data[0].status"), "object")
    cloneData.approvers_temp = restructureApprUsr(_.get(dataTickets, "tickets.data[0].approvers"))

 
    setState((p) => ({ ...p, ticketDef: cloneData }))

    setTimeout(() => {
      setState((p) => ({ ...p, loading: false }))
    }, 100);
  }


  useEffect(() => {

    if (dataTickets && _.get(dataTickets, "tickets.data[0]")) {

      defaultValProcess()

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