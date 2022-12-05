import React, { useEffect, useState } from 'react'
import type { NextPageWithLayout } from '@/types';
import { getLayout } from '@/components/layouts/layout';
import { adminOnly } from '@/utils/auth-utils';
import ModClassicLayout from '@/components/layouts/mod-classic';
import _ from 'lodash';
import { useRouter } from 'next/router';
import TicketTypeFormComp from '@/app/configurations/ticketTypes/forms';
import { breadcrumbType } from '@/types/custom';
import { isMobile } from 'react-device-detect';
import { useMutation, useQuery } from '@apollo/client';
import { GET_TICKET_TYPE_SPEC } from '@graphql/operations/tickets/ticketQueries';
import Spinner from '@/components/ui/loaders/spinner/spinner';
import { TicketTypeForm, TicketTypeFormDef } from '@/types/tickets/ticketType';

type Props = {

}

type StateType = {
    formDefault?: any
    dataLoading?: boolean
}


const TicketTypes: NextPageWithLayout = () => {
    const { query } = useRouter();
    const { searchType, id, ...restQuery } = query;
    const [state, setState] = useState<StateType>({
        formDefault: null,
        dataLoading: true
    })


    const breadcrumbs: breadcrumbType[] = [
        {
            title: 'Configurations',
            route: '/configurations',
            isHome: true,
            hidden: isMobile ? true : false
        },
        {
            title: 'Ticket Types',
            route: '/tickets/types',

        },
        {
            title: 'Type',
            isCurrent: true,
            route: '#',
        },
    ];

    const { data: dataTicketType, refetch, loading } = useQuery(GET_TICKET_TYPE_SPEC, {
        variables: {
            code: id,
            type: "specific"
        },
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
    });

    useEffect(() => {
        if (dataTicketType) {
          
            let data = _.cloneDeep(_.get(dataTicketType, "ticketTypes.data[0]"))
            let payload: TicketTypeFormDef = {};
            payload.isDisabled = data?.isDisabled
            payload.name = data?.name
            payload.approvers = data?.approvers
            payload.assignments = data?.assignments
            payload.submissionDepartment = data?.submissionDepartment
            payload.serviceDepartment = data?.serviceDepartment
            payload.addWorkWOApprovers = data?.addWorkWOApprovers
            payload.addWorkWOAssignedP = data?.addWorkWOAssignedP
            payload.code = id as string

            setState((p) => ({ ...p, formDefault: payload }))
            setTimeout(() => {
                setState((p) => ({ ...p, dataLoading: false }))
            }, 100);

        }
    }, [dataTicketType])


    return (
        <>
            <ModClassicLayout breadcrumb={breadcrumbs}>
                <>
                    <div className='pt-5'>
                        {state.dataLoading ? <Spinner /> : <TicketTypeFormComp code={id as string} defaults={state.formDefault} />}

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