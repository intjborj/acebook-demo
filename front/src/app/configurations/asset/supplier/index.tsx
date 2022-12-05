import React from 'react'
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_SUPPLIER } from '@graphql/operations/asset/assetQueries';
import { isMobile } from 'react-device-detect';
import ActionButtons from "@admin/components/common/action-buttons";
import HeaderDetails from '@/components/ui/headers/header-details'
import ACDataTable from '@/components/tables/data-table';
import ABTransition from '@/components/customs/transitions/ABTransition';
import _ from 'lodash';
import { FrontPath } from '@/constants/enums/paths';

type Props = {}




const SupplierApp = (props: Props) => {

    let columns: any = [
        {
            title: "Name",
            dataIndex: 'name',
            key: 'name',
            align: 'left',
            width: 180,
        },
        {
            title: "Mobile",
            dataIndex: 'mobile',
            key: 'mobile',
            align: 'left',
        },
        {
            title: "Email",
            dataIndex: 'email',
            key: 'email',
            align: 'left',
        },
        {
            title: "Address",
            dataIndex: 'address',
            key: 'address',
            align: 'left',
        }

    ];


    let actionCols = [
        {
            title: "Actions",
            dataIndex: '_id',
            key: 'actions',
            align: 'center',
            width: 65,
            render: (id: string) => (
                <ActionButtons
                    id={id}
                editUrl={`${FrontPath.SUPPLIER_FORM}/${id}`}
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


    const { data: allSupplier, refetch } = useQuery(GET_ALL_SUPPLIER, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
    });



    return (
        <div>
            <HeaderDetails
                title={'Suppliers'}
                buttonName={'+ Add New'}
                buttonRoute={FrontPath.SUPPLIER_FORM}
            />

            {
                (allSupplier && _.get(allSupplier, "assSuppliers.data")) &&
                <ABTransition>
                    <ACDataTable columns={columns} data={_.get(allSupplier, "assSuppliers.data")} />
                </ABTransition>
            }
        </div>
    )
}

export default SupplierApp