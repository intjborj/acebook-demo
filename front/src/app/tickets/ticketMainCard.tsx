// Dependencies
import React, { useMemo, useState } from 'react'
import { useQuery } from '@apollo/client';
import _ from 'lodash';
// Constants
import { GET_ALL_TICKETS, GET_TICKET_COUNTS } from '@graphql/operations/tickets/ticketQueries';
import { TicketTabMenu, TicketTabMenuDesc } from '@/types/tickets/enums/ticketEnums';
import { PARAM_CODE } from '@/types/route/params/enums/paramCode';
// Hooks
import { getAuthCredentials } from "@utils/auth-utils";
import { PostContextRd } from '@/reducers/posts/postContextRd';
import { useEncryption } from '@/hooks/useEncryption';
import { useLocalStorage } from '@/hooks/useLocalStorage';
// Global Components
import Spinner from '@/components/ui/loaders/spinner/spinner';
import ABTransition from '@/components/customs/transitions/ABTransition';
import NoData from '@/components/customs/information/noData';
// Custom Components
import ReceivedWorks from './reports/receivedWorks';
import TicketCardReportMain from './components/reports/ticketCardDisplay';
import ReportMenuMain from './components/menus/reportMenu';
import { ticketMenuList } from './components/fixedConstants/ticketMenuList';

type Props = {
    searchData?: any
}

type StateType = {
    currentTab?: TicketTabMenu;
    ticketData: any[];
    currentDropdown?: string;
    perPage?: number;
    currentPage?: number;
}

type VariableType = {
    type?: string | null;
    userId?: string | null;
    departmentId?: string | null;
    searchArg?: any;
    perPage?: number | null;
    page?: number | null;
}



const TicketMainCard = ({ searchData }: Props) => {
    let WorkFetchCodes = [TicketTabMenu.WORKS_RECEIVED, TicketTabMenu.WORKS_RECEIVED_MARKED, TicketTabMenu.WORKS_RECEIVED_TO_REC]
    const decipheredTab = useEncryption('decipher', useLocalStorage({ type: 'get', variable: PARAM_CODE.LEFT_TICKET_TAB_CODE }) as string)
    const initialData: StateType = {
        perPage: 10,
        currentPage: 1,
        ticketData: [],
        currentDropdown: "My Requests",
        currentTab: decipheredTab && decipheredTab != '' ? decipheredTab as TicketTabMenu : TicketTabMenu.MY_REQUESTS
    }

    const [statePostRd, dispatchPostRd] = React.useContext<any>(PostContextRd)
    const { user } = getAuthCredentials();
    const [state, setState] = useState(initialData)


    useMemo(() => {
        dispatchPostRd({ type: "content", content: TicketTabMenuDesc[state.currentTab as TicketTabMenu] })
    }, [])

    const variableContainer = ({ type, userId, departmentId, searchArg, perPage, page }: VariableType) => {
        let payload = {
            type: type,
            userId: _.get(user, "_id"),
            departmentId: _.get(user, "departmentOnDuty._id"),
            searchArg: searchArg,
            perPage: perPage,
            page: page
        }


        return payload
    }

    const { data: allTickets, refetch, error, loading: ticketLoading } = useQuery(GET_ALL_TICKETS, {
        variables: variableContainer({
            type: state.currentTab,
            searchArg: searchData,
            perPage: state.perPage,
            page: state.currentPage
        }),
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
    });


    const { data: ticketCounter, refetch: refetchCount, error: errorCount } = useQuery(GET_TICKET_COUNTS, {
        variables: {
            userId: _.get(user, "_id"),
            departmentId: _.get(user, "departmentOnDuty._id")
        },
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
    });

    useMemo(() => {
        if (searchData) {

            refetch(variableContainer({
                type: state.currentTab,
                searchArg: searchData,
                perPage: state.perPage,
                page: 1
            }))

        }
    }, [searchData])



    const tabAction = (data: any) => {
        if (!WorkFetchCodes.includes(data as TicketTabMenu)) {
            refetch(variableContainer({
                type: data,
                searchArg: searchData,
                perPage: state.perPage,
                page: state.currentPage
            }))
        }
        const cipheredTab = useEncryption('cipher', data)
        useLocalStorage({ type: 'set', variable: PARAM_CODE.LEFT_TICKET_TAB_CODE, value: cipheredTab })
        dispatchPostRd({ type: "content", content: TicketTabMenuDesc[data as TicketTabMenu] })

        setState((p) => ({ ...p, currentTab: data }));
    }

    const pageChange = (page: number) => {
        refetch(variableContainer({
            type: state.currentTab,
            userId: _.get(user, "_id"),
            departmentId: _.get(user, "departmentOnDuty._id"),
            searchArg: searchData,
            perPage: state.perPage,
            page: page
        }))
    }

    return (
        <div className='w-full pb-10'>
            <div className='flex justify-center'>
                <div className='grid grid-cols-1 gap-2 w-full  md:w-2/3'>
                    <div className='flex justfy-center w-full '>
                        <ReportMenuMain menu={ticketMenuList({
                            approvalCount: _.get(ticketCounter, "ticketCounts.data.forApproval"),
                            workCount: _.get(ticketCounter, "ticketCounts.data.worksReceived"),
                            myApproved: _.get(ticketCounter, "ticketCounts.data.myApproved"),
                            myAssigned: _.get(ticketCounter, "ticketCounts.data.myAssigned"),
                            myCreatedTickets: _.get(ticketCounter, "ticketCounts.data.myCreatedTickets"),
                            deptServTickets: _.get(ticketCounter, "ticketCounts.data.deptServTickets"),
                            deptTicketRequest: _.get(ticketCounter, "ticketCounts.data.deptTicketRequest"),
                            markedReceivedWorks: _.get(ticketCounter, "ticketCounts.data.markedReceivedWorks"),
                            allTickets: _.get(ticketCounter, "ticketCounts.data.allTickets"),
                            moreCount: _.get(ticketCounter, "ticketCounts.data.moreCount")
                        })} action={tabAction}
                            title="ticket"
                        />
                    </div>
                </div>
            </div>
            <ABTransition>
                {
                    WorkFetchCodes.includes(state.currentTab as TicketTabMenu) ? <ReceivedWorks searchData={searchData} fetchCode={state.currentTab} /> :
                        <>
                            {ticketLoading ? <Spinner /> :
                                <>
                                    {_.get(allTickets, 'tickets.data') && _.get(allTickets, 'tickets.data').length > 0
                                        ? <TicketCardReportMain data={_.get(allTickets, 'tickets.data')} paginationInfo={_.get(allTickets, 'tickets.paginatorInfo')} pageChange={pageChange} />
                                        : <NoData />}
                                </>
                            }
                        </>
                }
            </ABTransition>
        </div >
    )
}

export default TicketMainCard