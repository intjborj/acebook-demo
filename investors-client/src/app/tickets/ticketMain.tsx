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

type Props = {}

type StateType = {
    currentTab?: string;
    ticketData: any[];
    currentDropdown?: string;
}

const initialData: StateType = {
    ticketData: [],
    currentDropdown: "My Requests",
    currentTab: "MY_REQUESTS"
}

const TicketMain = (props: Props) => {
    const { user } = getAuthCredentials();
    const { alignLeft, alignRight } = useIsRTL();
    const [state, setState] = useState(initialData)

    const { data: allTickets, refetch, error } = useQuery(GET_ALL_TICKETS, {
        variables: {
            type: "MY_REQUESTS",
            userId: _.get(user, "_id"),
            departmentId: null
        },
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
    });


    const { data: ticketCounter, refetch: refetchCount, error:errorCount } = useQuery(GET_TICKET_COUNTS, {
        variables: {
            userId: _.get(user, "_id")
        },
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
    });

    console.log("ticketCounter", ticketCounter)

    const columns = [
        // {
        //   title:"ID",
        //   dataIndex: 'id',
        //   key: 'id',
        //   align: 'center',
        //   width: 60,
        // },
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
            title: "Requesting Department",
            dataIndex: 'requestingDepartment',
            key: 'requestingDepartment',
            align: 'left',
            ellipsis: true,
        },
        {
            title: "Type",
            dataIndex: 'type',
            key: 'type',
            align: 'left',
            ellipsis: true,
        },
        {
            title: "Status",
            dataIndex: 'status',
            key: 'status',
            align: 'left',
            ellipsis: true,
        },
        {
            title: "Actions",
            dataIndex: '_id',
            key: 'actions',
            align: 'center',
            width: 90,
            render: (id: string) => (
                <ActionButtons
                    id={id}
                    editUrl={`/tickets/form/update/${id}`}
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
                dataload.type = ticketTypeIdentifier(_.get(item, "type"), "name")
                dataload.status = ticketStatusIdentifier(_.get(item, "status"), "name")

                return dataload
            });
            setState((p) => ({ ...p, ticketData: structuredTicket }));
        }
    }, [allTickets]);


    const refetchingData = (data: string) => {
        console.log("passed", data)
        switch (data) {
            case "all":
                refetch({
                    type: "MY_REQUESTS",
                    userId: _.get(user, "_id")
                })
                break;
            case "allApprAssig":
                refetch({
                    type: "ALL_APPR_ASSIG",
                    userId: _.get(user, "_id")
                })
                break;
            case "myApprovals":
                refetch({
                    type: "FOR_APPROVAL",
                    userId: _.get(user, "_id")
                })
                break;
            case "approved":
                refetch({
                    type: "APPROVED",
                    userId: _.get(user, "_id")
                })
                break;
            default:
                break;
        }
    }

    const tabAction = (data: any) => {
        // refetchingData(data)

        refetch({
            type: data,
            userId: _.get(user, "_id")
        })
        setState((p) => ({ ...p, currentTab: data }));
    }

    const dropAction = (data: TabMenuType) => {
        console.log("data.fetchCode", data.fetchCode)
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
            label: 'All',
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
                {state.currentTab === "MY_REQUESTS" && <Dropdown menu={menuDropdown} btnName={state.currentDropdown} action={dropAction} />}
            </div>
            <ACDataTable columns={columns} data={state.ticketData} />
        </div>
    )
}

export default TicketMain