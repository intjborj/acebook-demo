import React from 'react'
import type { NextPageWithLayout } from '@/types';
import { getLayout } from '@/components/layouts/layout';
import { adminOnly } from '@/utils/auth-utils';
import ModClassicLayout from '@/components/layouts/mod-classic';
import { FrontPath } from '@/constants/enums/paths';
import SupplierFormApp from '@/app/configurations/asset/supplier/form';


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


    return (
        <>
            <ModClassicLayout breadcrumb={breadcrumbs}>
                <div className='pt-2'>
                  <SupplierFormApp/>
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