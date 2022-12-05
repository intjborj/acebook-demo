import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client';
import { GET_WORKREPORT } from '@graphql/operations/tickets/ticketQueries';
import { getAuthCredentials } from "@utils/auth-utils";
import _ from 'lodash';
import ACDataTable from '@/components/tables/data-table';
import { useIsRTL } from '@/utils/locals';
import ABTransition from '@/components/customs/transitions/ABTransition';
import ActionButtons from '@/components/admin/components/common/action-buttons';
// import WorkCardReportMain from '../components/reports/workCardDisplay';
import NoData from '@/components/customs/information/noData';

// type Props = {}
// type StateType = {
//   workReportData?: any;
// }

// type ColumnType = {
//   code?: string;
//   subject?: string;
//   requestingDepartment?: string;
//   serviceDepartment?: string;
//   type?: string;
//   status?: string;
// }

// const ReceivedWorks = (props: Props) => {
//   const { user } = getAuthCredentials();
//   const { alignLeft, alignRight } = useIsRTL();
//   const [state, setState] = useState<StateType>({
//     workReportData: null
//   })
//   const { data: workReport, refetch, error, loading: workLoading } = useQuery(GET_WORKREPORT, {
//     variables: {
//       department: _.get(user, "departmentOnDuty._id"),
//       type:"WORKS_RECEIVED_TO_REC"
//     },
//     fetchPolicy: 'cache-and-network',
//     nextFetchPolicy: 'cache-first',
//   });


//   const columns = [
//     {
//       title: "Code",
//       dataIndex: 'code',
//       key: 'code',
//       align: 'center',
//       width: 100,
//     },
//     {
//       title: "Subject",
//       className: 'cursor-pointer',
//       dataIndex: 'subject',
//       key: 'subject',
//       align: alignLeft,
//       // onHeaderCell: () => onHeaderClick(QueryTagsOrderByColumn.Name),
//     },
//     {
//       title: "Requesting Dept.",
//       dataIndex: 'requestingDepartment',
//       key: 'requestingDepartment',
//       align: 'left',
//       ellipsis: true,
//       width: 140,
//     },
//     {
//       title: "Service Dept.",
//       dataIndex: 'serviceDepartment',
//       key: 'serviceDepartment',
//       align: 'left',
//       ellipsis: true,
//       width: 140,
//     },
//     {
//       title: "Type",
//       dataIndex: 'type',
//       key: 'type',
//       align: 'left',
//       ellipsis: true,
//       width: 120,
//     },
//     {
//       title: "Status",
//       dataIndex: 'status',
//       key: 'status',
//       align: 'left',
//       ellipsis: true,
//       width: 140,
//     },
//     {
//         title: "Actions",
//         dataIndex: '_id',
//         key: 'actions',
//         align: 'center',
//         width: 90,
//         render: (id: string, record: any) => (
//             <ActionButtons
//                 id={id}
//                 detailsUrl={`/tickets/works/view/${id}?mn=${record?.ticketId}`}
//             />
//         ),
//     },
//   ];

//   useEffect(() => {
//     if (workReport && _.get(workReport, "workDetailReports.data")) {
//       let dataload : ColumnType[] = _.get(workReport, "workDetailReports.data").map((item: any) => {
//         return {
//           _id: _.get(item, "_id"), 
//           code: _.get(item, "code"), 
//           subject:  _.get(item, "ticket.subject"),
//           requestingDepartment:  _.get(item, "ticket.requestingDepartment.name"),
//           serviceDepartment:  _.get(item, "ticket.serviceDepartment.name"),
//           type:  _.get(item, "ticket.type"),
//           status :  _.get(item, "workStatus"),
//           ticketId :  _.get(item, "ticket._id"),
//         }
//       })

//       setState((p)=>({...p, workReportData: dataload}))
//     }
//   }, [workReport])


//   return (
//     <div>
//       <ABTransition>
//         {/* <ACDataTable columns={columns} data={state.workReportData} /> */}
//       {  _.get(workReport, "workDetailReports.data") &&  _.get(workReport, "workDetailReports.data").length > 0 ? <WorkCardReportMain data={ _.get(workReport, "workDetailReports.data")}/> : <NoData/>}
//       </ABTransition>
//     </div>
//   )
// }

// export default ReceivedWorks