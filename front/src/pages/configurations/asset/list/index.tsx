import React from 'react'
import type { NextPageWithLayout } from '@/types';
import { getLayout } from '@/components/layouts/layout';
import { adminOnly } from '@/utils/auth-utils';
import ModClassicLayout from '@/components/layouts/mod-classic';
import ManufacturerApp from '@/app/configurations/asset/manufacturer';
import { FrontPath } from '@/constants/enums/paths';
import AssetListApp from '@/app/configurations/asset/assetList';


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

const AssetListIndex: NextPageWithLayout = () => {


    return (
        <>
            <ModClassicLayout breadcrumb={breadcrumbs}>
                <div className='pt-2'>
                    {/* <ManufacturerApp /> */}
                    <AssetListApp />
                </div>
            </ModClassicLayout>
        </>
    )
}
AssetListIndex.getLayout = getLayout;

AssetListIndex.authenticate = {
    permissions: adminOnly,
};

export default AssetListIndex