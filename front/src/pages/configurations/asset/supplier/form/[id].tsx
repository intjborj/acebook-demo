import React, { useState, useEffect } from 'react'
import type { NextPageWithLayout } from '@/types';
import { getLayout } from '@/components/layouts/layout';
import { adminOnly } from '@/utils/auth-utils';
import ModClassicLayout from '@/components/layouts/mod-classic';
import { FrontPath } from '@/constants/enums/paths';
import SupplierFormApp from '@/app/configurations/asset/supplier/form';
import { ManufacturerType, SupplierType } from '@/types/assets/assetsType';
import { useRouter } from 'next/router';
import { useQuery, useMutation } from '@apollo/client';
import { GET_SPEC_SUPPLIER } from '@graphql/operations/asset/assetQueries';
import _, { isEmpty } from 'lodash';

type Props = {}
const breadcrumbs = [
    {
        title: 'Suppliers',
        route: FrontPath.SUPPLIER_LIST,
        isHome: true,
    },
    {
        title: 'Form',
        route: '#',
        isCurrent: true,
    },
];

const SupplierFormIndex: NextPageWithLayout = () => {
    const { query } = useRouter();
    const { searchType, id: supId, ...restQuery } = query;
    const [defaultValue, setDefaultValue] = useState<SupplierType | null>(null)

    const { data: specSup, refetch } = useQuery(GET_SPEC_SUPPLIER, {
        variables: {
            id: supId
        },
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
    });

  


    useEffect(() => {
        if (specSup) {
            let dataLoad : SupplierType= _.get(specSup, "assSupplier.data")
            let payload = {
                _id: dataLoad._id,
                name: dataLoad?.name,
                migrationId: dataLoad?.migrationId,
                mobile: dataLoad?.mobile,
                email: dataLoad?.email,
                url: dataLoad?.url,
                information: dataLoad?.information,
                address: dataLoad?.address,
                contactPerson: dataLoad?.contactPerson,
                contactTelephone: dataLoad?.contactTelephone,
                contactEmail: dataLoad?.contactEmail,
            }
            setDefaultValue(payload)
        }

        return () => {
            setDefaultValue({})
        }
    }, [specSup])


    return (
        <>
            <ModClassicLayout breadcrumb={breadcrumbs}>
                <div className='pt-2'>
                 { !isEmpty(defaultValue) &&  <SupplierFormApp  defaultVals={defaultValue}/>}
                </div>
            </ModClassicLayout>
        </>
    )
}
SupplierFormIndex.getLayout = getLayout;

SupplierFormIndex.authenticate = {
    permissions: adminOnly,
};

export default SupplierFormIndex