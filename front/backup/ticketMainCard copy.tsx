import React, { useEffect, useState } from 'react'
// import { useIsRTL } from '@/utils/locals';
// import { useQuery } from '@apollo/client';
// import { GET_ALL_TICKETS, GET_TICKET_COUNTS } from '@graphql/operations/tickets/ticketQueries';
// import _ from 'lodash';
// import { getAuthCredentials } from "@utils/auth-utils";
// import { TabMenuType } from '@/types/custom';
// import Spinner from '@/components/ui/loaders/spinner/spinner';
// import ReceivedWorks from './reports/receivedWorks';
// import ABTransition from '@/components/customs/transitions/ABTransition';
// import TicketCardReportMain from './components/reports/ticketCardDisplay';
// import ReportMenuMain, { MenuAttType } from './components/menus/reportMenu';
// import NoData from '@/components/customs/information/noData';
// import { ticketMenuList } from './components/fixedConstants/ticketMenuList';
// import { TicketTabMenu, TicketTabMenuDesc } from '@/types/tickets/enums/ticketEnums';
// import { PostContextRd } from '@/reducers/posts/postContextRd';
// import { useTicketIndexStore } from './zustandState';
// import { PARAM_CODE } from '@/types/route/params/enums/paramCode';
// import { useEncryption } from '@/hooks/useEncryption';
// import { useLocalStorage } from '@/hooks/useLocalStorage';
// import ABPagination from '@/components/customs/pagination/ABPagination';
// type Props = {
//     searchData?: any
// }

// type StateType = {
//     currentTab?: TicketTabMenu;
//     ticketData: any[];
//     currentDropdown?: string;
//     perPage?: number;
//     currentPage?: number;
// }



// const TicketMainCard = ({ searchData }: Props) => {
//     let WorkFetchCodes = [TicketTabMenu.WORKS_RECEIVED, TicketTabMenu.WORKS_RECEIVED_MARKED, TicketTabMenu.WORKS_RECEIVED_TO_REC]
//     const decipheredTab = useEncryption('decipher', useLocalStorage({ type: 'get', variable: PARAM_CODE.LEFT_TICKET_TAB_CODE }) as string)
//     const initialData: StateType = {
//         perPage: 10,
//         currentPage: 1,
//         ticketData: [],
//         currentDropdown: "My Requests",
//         currentTab: decipheredTab && decipheredTab != '' ? decipheredTab as TicketTabMenu : TicketTabMenu.MY_REQUESTS
//     }

//     const [statePostRd, dispatchPostRd] = React.useContext<any>(PostContextRd)
//     const { user } = getAuthCredentials();
//     const [state, setState] = useState(initialData)

//     const variableContainer = ()=>{
//         return {
//             type: TicketTabMenu.MY_REQUESTS,
//             userId: _.get(user, "_id"),
//             departmentId: null,
//             searchArg: searchData,
//             perPage: state.perPage,
//             page: state.currentPage
//         }
//     }

//     const { data: allTickets, refetch, error, loading: ticketLoading } = useQuery(GET_ALL_TICKETS, {
//         variables: {
//             type: TicketTabMenu.MY_REQUESTS,
//             userId: _.get(user, "_id"),
//             departmentId: null,
//             searchArg: searchData,
//             perPage: state.perPage,
//             page: state.currentPage
//         },
//         fetchPolicy: 'cache-and-network',
//         nextFetchPolicy: 'cache-first',
//     });


//     const { data: ticketCounter, refetch: refetchCount, error: errorCount } = useQuery(GET_TICKET_COUNTS, {
//         variables: {
//             userId: _.get(user, "_id"),
//             departmentId: _.get(user, "departmentOnDuty._id")
//         },
//         fetchPolicy: 'cache-and-network',
//         nextFetchPolicy: 'cache-first',
//     });

//     useEffect(() => {
//         if (searchData) {

//             refetch({
//                 type: state.currentTab,
//                 userId: _.get(user, "_id"),
//                 departmentId: _.get(user, "departmentOnDuty._id"),
//                 searchArg: searchData,
//                 perPage: state.perPage,
//                 page: 1
//             })

//         }
//     }, [searchData])



//     const tabAction = (data: any) => {
//         if (!WorkFetchCodes.includes(state.currentTab as TicketTabMenu)) {
//             refetch({
//                 type: data,
//                 userId: _.get(user, "_id"),
//                 departmentId: _.get(user, "departmentOnDuty._id"),
//                 searchArg: searchData,
//                 perPage: state.perPage,
//                 page: state.currentPage
//             })
//         }
//         const cipheredTab = useEncryption('cipher', data)
//         useLocalStorage({ type: 'set', variable: PARAM_CODE.LEFT_TICKET_TAB_CODE, value: cipheredTab })
//         dispatchPostRd({ type: "content", content: TicketTabMenuDesc[data as TicketTabMenu] })

//         setState((p) => ({ ...p, currentTab: data }));
//     }

//     const pageChange = (page:number)=>{
 
//         refetch({
//             type: state.currentTab,
//             userId: _.get(user, "_id"),
//             departmentId: _.get(user, "departmentOnDuty._id"),
//             searchArg: searchData,
//             perPage: state.perPage,
//             page: page
//         })
//     }

//     return (
//         <div className='w-full pb-10'>
//             <div className='flex justify-center'>
//                 <div className='grid grid-cols-1 gap-2 w-full  md:w-2/3'>
//                     <div className='flex justfy-center w-full '>
//                         <ReportMenuMain menu={ticketMenuList({
//                             approvalCount: _.get(ticketCounter, "ticketCounts.data.forApproval"),
//                             workCount: _.get(ticketCounter, "ticketCounts.data.worksReceived"),
//                             myApproved: _.get(ticketCounter, "ticketCounts.data.myApproved"),
//                             myAssigned: _.get(ticketCounter, "ticketCounts.data.myAssigned"),
//                             myCreatedTickets: _.get(ticketCounter, "ticketCounts.data.myCreatedTickets"),
//                             deptServTickets: _.get(ticketCounter, "ticketCounts.data.deptServTickets"),
//                             deptTicketRequest: _.get(ticketCounter, "ticketCounts.data.deptTicketRequest"),
//                             markedReceivedWorks: _.get(ticketCounter, "ticketCounts.data.markedReceivedWorks"),
//                             moreCount: _.get(ticketCounter, "ticketCounts.data.moreCount")
//                         })} action={tabAction}
//                             title="ticket"
//                         />
//                     </div>
//                 </div>
//             </div>
//             <ABTransition>
//                 {
//                     WorkFetchCodes.includes(state.currentTab as TicketTabMenu) ? <ReceivedWorks searchData={searchData} fetchCode={state.currentTab} /> :
//                         <>
//                             {ticketLoading ? <Spinner /> :
//                                 <>
//                                     {_.get(allTickets, 'tickets.data') && _.get(allTickets, 'tickets.data').length > 0
//                                         ? <TicketCardReportMain data={_.get(allTickets, 'tickets.data')} paginationInfo={_.get(allTickets, 'tickets.paginatorInfo')} pageChange={pageChange} />
//                                         : <NoData />}
//                                 </>
//                             }
//                         </>
//                 }
//             </ABTransition>
//         </div >
//     )
// }

// export default TicketMainCard