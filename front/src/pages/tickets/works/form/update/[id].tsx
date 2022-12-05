// Dependencies
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import _ from 'lodash'
// Constants
import type { NextPageWithLayout } from '@/types';
import { FrontPath } from '@/constants/enums/paths';
import { TicketWorksUploadPath } from '@/constants/uploadPaths';
import { WorkFormValues } from '@/types/workDetails/workTypes';
import { adminOnly } from '@/utils/auth-utils';
import { GET_WORKDETAIL } from '@graphql/operations/tickets/ticketQueries';
// Hooks
import { extractFileBlobDynamic } from '@/services/extractions';
// Custom Components
import ABTransition from '@/components/customs/transitions/ABTransition';
import { getLayout } from '@/components/layouts/layout';
import WorkFormApp from '@/app/tickets/works/form';
import ModClassicLayout from '@/components/layouts/mod-classic';
import { workCatIdentifier } from '@/constants/tickets/works/options';

type StateType = {
  defaultVals?: WorkFormValues | null;
}

const WorkFormAddIndex: NextPageWithLayout = () => {
  const { query } = useRouter();
  const { searchType, id: workId, ...restQuery } = query;
  const [state, setState] = useState<StateType>({
    defaultVals: null
  })

  const { data: dataWork, refetch, loading } = useQuery(GET_WORKDETAIL, {
    variables: {
      id: workId
    },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });

  const workDefaultValProcess = async () => {
    let dataObj: WorkFormValues = _.get(dataWork, "workDetail.data")

    let getAttBlob = await extractFileBlobDynamic({
      attachments: _.get(dataWork, "workDetail.data.attachments"),
      type: "ticketworks",
      initPath: `${_.get(dataWork, "workDetail.data.ticket.code")}/${_.get(dataWork, "workDetail.data.code")}`,
      completePath: TicketWorksUploadPath({ ticketCode: _.get(dataWork, "workDetail.data.ticket.code"), workCode: _.get(dataWork, "workDetail.data.code") })
    })

    let modAtt = getAttBlob.map((item: any) => {
      item.isOld = 1
      return item
    })

    let submDept = []
    if (dataObj?.submissionDepartment && dataObj.submissionDepartment.length > 0) {
      submDept = dataObj?.submissionDepartment.map((item: any) => {
        return {
          ...item.department,
          status: item.status,
          updatedAt: item.updatedAt
        }
      })
    }
    let payload: WorkFormValues = {
      attachments_image: getAttBlob,
      workCode: dataObj.code,
      findings: dataObj.findings,
      dateTimeFinished: dataObj.dateTimeFinished,
      dateTimeStarted: dataObj.dateTimeStarted,
      descActualWorkDone: dataObj.descActualWorkDone,
      submissionDepartment: submDept,
      performedBy: dataObj.performedBy,
      assetVariation: dataObj.assetVariation,
      workCategory: dataObj?.workCategory ? workCatIdentifier(dataObj?.workCategory, "object") : null
    }
    setState((p) => ({ ...p, defaultVals: payload }))
  }


  useEffect(() => {
    if (dataWork) {
      workDefaultValProcess()
    }
  }, [dataWork])

  let prev = {
    title: 'Ticket Origin',
    route: `${FrontPath.TICKET_VIEW}/${_.get(dataWork, "workDetail.data.ticket._id")}`,
  }

  if (restQuery.fr == 'view') {
    prev = {
      title: 'Work Origin',
      route: `${FrontPath.TICKET_WORK_VIEW}/${workId}?mn=${_.get(dataWork, "workDetail.data.ticket._id")}`,
    }
  }

  const breadcrumbs = [
    {
      title: 'Tickets',
      route: FrontPath.TICKETS,
      isHome: true,
    },
    {
      ...prev
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
          {/* {loading? <Spinner/> :  <ViewTicketApp data={dataTickets} />} */}
          {state.defaultVals &&
            <ABTransition>
              <WorkFormApp workId={_.get(dataWork, "workDetail.data._id")} defaultVals={state.defaultVals} ticketId={_.get(dataWork, "workDetail.data.ticket._id") as string} />
            </ABTransition>
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