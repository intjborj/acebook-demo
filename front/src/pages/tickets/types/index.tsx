import React from 'react'
import type { NextPageWithLayout } from '@/types';
import { getLayout } from '@/components/layouts/layout';
import ModIndexClassicLayout from '@/components/layouts/mod-index-classic';
import { adminOnly } from '@/utils/auth-utils';
import HeaderDetails from '@/components/ui/headers/header-details';
import ModClassicLayout from '@/components/layouts/mod-classic';
import ACDataTable from '@/components/tables/data-table';
import { useQuery } from '@apollo/client';
import { GET_TICKET_TYPE } from '@graphql/operations/tickets/ticketQueries';
import ActionButtons from "@admin/components/common/action-buttons";
import _ from 'lodash';
import { isMobile } from 'react-device-detect';

type Props = {}

const TicketTypes: NextPageWithLayout = () => {

    const breadcrumbs = [
        {
            title: 'Configurations',
            route: '/configurations',
            isHome: true,
        },
        {
            title: 'Ticket Types',
            route: '',
            isCurrent: true,
        },
    ];



    let columns: any = [
        {
            title: "Type Name",
            dataIndex: 'name',
            key: 'name',
            align: 'left',
            ellipsis: true,
        }

    ];

    let actionCols = [
        {
            title: "Actions",
            dataIndex: 'code',
            key: 'actions',
            align: 'center',
            width: 65,
            render: (code: string) => (
                <ActionButtons
                    id={code}
                    editUrl={`/tickets/types/${code}`}
                // editUrl={`${ROUTES.TAGS}/${id}/edit`}
                // deleteModalView="DELETE_TAG"
                />
            ),
        }
    ]

    if (isMobile) {
        columns = [...actionCols, ...columns]
    } else {
        columns = [...columns, ...actionCols]
    }


    const { data: dataTickets, refetch } = useQuery(GET_TICKET_TYPE, {
        variables: {
            type: "all"
        },
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
    });


    return (
        <>
            <ModClassicLayout breadcrumb={breadcrumbs}>
                <>
                    <div className='pt-5'>
                        <HeaderDetails
                            title={'Ticket Types'}
                        // buttonName={'+ Ticket Type'}
                        // buttonRoute={'/accounts/create'}
                        />
                        <div className=''>
                            <ACDataTable columns={columns} data={_.get(dataTickets, "ticketTypes.data")} />
                        </div>
                    </div>
                </>
            </ModClassicLayout>
        </>
    )
}
TicketTypes.getLayout = getLayout;

TicketTypes.authenticate = {
    permissions: adminOnly,
};

export default TicketTypes