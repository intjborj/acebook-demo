import React from 'react'
import type { NextPageWithLayout } from '@/types';
import { getLayout } from '@/components/layouts/layout';
import { adminOnly } from '@/utils/auth-utils';
import ModClassicLayout from '@/components/layouts/mod-classic';
import ManufacturerApp from '@/app/configurations/asset/manufacturer';
import AssManufacturerForm from '@/app/configurations/asset/manufacturer/form';
import { FrontPath } from '@/constants/enums/paths';
import AssetFormApp from '@/app/configurations/asset/assetList/form';

type Props = {}

const breadcrumbs = [
    {
        title: 'Asset List',
        route: FrontPath.ASSET_LIST,
        isHome: true,
    },
    {
        title: 'Create',
        route: '#',
        isCurrent: true,
    },
];


const AssetFormCreateIndex: NextPageWithLayout = () => {

    return (
        <>
            <ModClassicLayout breadcrumb={breadcrumbs}>
                <>
                    <AssetFormApp />
                </>
            </ModClassicLayout>
        </>
    )
}
AssetFormCreateIndex.getLayout = getLayout;

AssetFormCreateIndex.authenticate = {
    permissions: adminOnly,
};

export default AssetFormCreateIndex