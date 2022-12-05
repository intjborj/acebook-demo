import React from 'react'
import type { NextPageWithLayout } from '@/types';
import { getLayout } from '@/components/layouts/layout';
import { adminOnly } from '@/utils/auth-utils';
import ModClassicLayout from '@/components/layouts/mod-classic';
import ManufacturerApp from '@/app/configurations/asset/manufacturer';
import { FrontPath } from '@/constants/enums/paths';
import SupplierApp from '@/app/configurations/asset/supplier';


type Props = {}
const breadcrumbs = [
    {
        title: 'Asset Config',
        route: FrontPath.ASSET_CONFIGS,
        isHome: true,
    },
    {
        title: 'Lists',
        route: '#',
        isCurrent: true,
    },
];

const SupplierIndex: NextPageWithLayout = () => {


    return (
        <>
            <ModClassicLayout breadcrumb={breadcrumbs}>
                <div className='pt-2'>
                    <SupplierApp />
                </div>
            </ModClassicLayout>
        </>
    )
}
SupplierIndex.getLayout = getLayout;

SupplierIndex.authenticate = {
    permissions: adminOnly,
};

export default SupplierIndex