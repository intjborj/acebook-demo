import React, { useEffect, useState } from 'react'
import type { NextPageWithLayout } from '@/types';
import { getLayout } from '@/components/layouts/layout';
import ModIndexClassicLayout from '@/components/layouts/mod-index-classic';
import { adminOnly } from '@/utils/auth-utils';
import ModClassicLayout from '@/components/layouts/mod-classic';
import ActionButtons from "@admin/components/common/action-buttons";
import TitleWithSort from '@admin/components/ui/title-with-sort';
import { useIsRTL } from '@/utils/locals';
import ACDataTable from '@/components/tables/data-table';
import { useQuery } from '@apollo/client';
import { GET_ALL_TICKETS, GET_TICKET_COUNTS } from '@graphql/operations/tickets/ticketQueries';
import _ from 'lodash';
import { TicketFormValues, TicketVarType } from '@/types/tickets/ticketType';
import { ticketStatusIdentifier, ticketTypeIdentifier } from '@/constants/options';
import { getAuthCredentials } from "@utils/auth-utils";
import TabsBg from '@/components/tabs/tabsBg';
import Dropdown from '@/components/ui/dropdowns/dropdown';
import { TabMenuType } from '@/types/custom';
import DropdownTrans from '@/components/ui/dropdowns/Transitioned';
import Spinner from '@/components/ui/loaders/spinner/spinner';
import ReceivedWorks from './reports/receivedWorks';
import ABTransition from '@/components/customs/transitions/ABTransition';
import TicketCardReportMain from './components/reports/ticketCardDisplay';

type Props = {}

enum TabMenu {
    MY_REQUESTS = "MY_REQUESTS",
    FOR_APPROVAL = "FOR_APPROVAL",
    APPROVED = "APPROVED",
    WORKS_RECEIVED = "WORKS_RECEIVED",
}

type StateType = {
    currentTab?: TabMenu;
    ticketData: any[];
    currentDropdown?: string;
}

const initialData: StateType = {
    ticketData: [],
    currentDropdown: "My Requests",
    currentTab: TabMenu.MY_REQUESTS
}

const TicketMain = (props: Props) => {
    const { user } = getAuthCredentials();
    const { alignLeft, alignRight } = useIsRTL();
    const [state, setState] = useState(initialData)

    const { data: allTickets, refetch, error, loading: ticketLoading } = useQuery(GET_ALL_TICKETS, {
        variables: {
            type: "MY_REQUESTS",
            userId: _.get(user, "_id"),
            departmentId: null
        },
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


    const columns = [
        {
            title: "Code",
            dataIndex: 'code',
            key: 'code',
            align: 'center',
            width: 100,
        },
        {
            title: (
                <TitleWithSort
                    title={"Subject"}
                    ascending={true}
                    isActive={true}
                />
            ),
            className: 'cursor-pointer',
            dataIndex: 'subject',
            key: 'subject',
            align: alignLeft,
            // onHeaderCell: () => onHeaderClick(QueryTagsOrderByColumn.Name),
        },
        {
            title: "Requesting Dept.",
            dataIndex: 'requestingDepartment',
            key: 'requestingDepartment',
            align: 'left',
            ellipsis: true,
            width: 140,
        },
        {
            title: "Service Dept.",
            dataIndex: 'serviceDepartment',
            key: 'serviceDepartment',
            align: 'left',
            ellipsis: true,
            width: 140,
        },
        {
            title: "Type",
            dataIndex: 'type',
            key: 'type',
            align: 'left',
            ellipsis: true,
            width: 120,
        },
        {
            title: "Status",
            dataIndex: 'status',
            key: 'status',
            align: 'left',
            ellipsis: true,
            width: 140,
        },
        {
            title: "Actions",
            dataIndex: '_id',
            key: 'actions',
            align: 'center',
            width: 90,
            render: (id: string, record: TicketFormValues) => (
                <ActionButtons
                    id={id}
                    editUrl={[record.serviceDepartmentId].includes(_.get(user, "departmentOnDuty._id")) ? `/tickets/form/update/${id}` : ``}
                    // editUrl={`/tickets/form/update/${id}`}
                    detailsUrl={`/tickets/view/${id}`}
                // editUrl={`${ROUTES.TAGS}/${id}/edit`}
                // deleteModalView="DELETE_TAG"
                />
            ),
        },
    ];


    useEffect(() => {
        if (_.get(allTickets, 'tickets.data')) {
            const structuredTicket = _.get(allTickets, 'tickets.data').map((item: any) => {
                let dataload: TicketFormValues = _.cloneDeep(item);
                dataload.requestingDepartment = _.get(item, "requestingDepartment.name")
                dataload.serviceDepartment = _.get(item, "serviceDepartment.name")
                dataload.serviceDepartmentId = _.get(item, "serviceDepartment._id")
                dataload.type =  _.get(item, "typeId.name")
                // dataload.type = ticketTypeIdentifier(_.get(item, "type"), "name") as string
                dataload.status = ticketStatusIdentifier(_.get(item, "status"), "name") as string

                return dataload
            });
            setState((p) => ({ ...p, ticketData: structuredTicket }));
        }
    }, [allTickets]);




    const tabAction = (data: any) => {
        // refetchingData(data)

        refetch({
            type: data,
            userId: _.get(user, "_id")
        })
        setState((p) => ({ ...p, currentTab: data }));
    }

    const dropAction = (data: TabMenuType) => {

        refetch({
            type: data.fetchCode,
            userId: _.get(user, "_id"),
            departmentId: _.get(user, "departmentOnDuty._id")
        })
        setState((p) => ({ ...p, currentDropdown: data.label }));
    }


    const menuTab: TabMenuType[] = [
        {
            name: 'all',
            label: 'Requests',
            fetchCode: 'MY_REQUESTS',
            default: true
        },
        {
            name: 'myApprovals',
            fetchCode: 'FOR_APPROVAL',
            label: 'My Approvals',
            default: false,
            count: _.get(ticketCounter, "ticketCounts.data.forApproval")
        },
        {
            name: 'approved',
            fetchCode: 'APPROVED',
            label: 'Approved',
            default: false
        },
        {
            name: 'WORKS_RECEIVED',
            fetchCode: 'WORKS_RECEIVED',
            label: 'Works Received',
            default: false,
            count: _.get(ticketCounter, "ticketCounts.data.worksReceived")
        },

    ]

    const menuDropdown: TabMenuType[] = [
        {
            name: 'MY_REQUESTS ',
            fetchCode: 'MY_REQUESTS',
            label: 'My Requests'
        },
        {
            name: 'ALL_APPR_ASSIG',
            fetchCode: 'ALL_APPR_ASSIG',
            label: 'My Assignatories',
        },
        {
            name: 'DEPARTMENT_TICKETS',
            fetchCode: 'DEPARTMENT_TICKETS',
            label: 'Department Tickets',
        }

    ]

    return (
        <div>

            <TabsBg action={tabAction} menu={menuTab} currentTab="all" />
            <div className='flex justify-start pl-2 pb-5'>
                {/* {state.currentTab === "MY_REQUESTS" && <Dropdown menu={menuDropdown} btnName={state.currentDropdown} action={dropAction} />} */}
                {state.currentTab === "MY_REQUESTS" && <DropdownTrans menu={menuDropdown} buttonName={state.currentDropdown} action={dropAction} />}
            </div>
            {[TabMenu.APPROVED, TabMenu.FOR_APPROVAL, TabMenu.MY_REQUESTS].includes(state.currentTab as TabMenu) && <> {state.ticketData ?
                <ABTransition>
                    {/* <ACDataTable columns={columns} data={state.ticketData} /> */}
                    <div className=''>
                        <TicketCardReportMain data={_.get(allTickets, 'tickets.data')} />
                    </div>

                </ABTransition>
                : <Spinner />}</>}

            {state.currentTab == 'WORKS_RECEIVED' && <ReceivedWorks />}
        </div >
    )
}

export default TicketMain