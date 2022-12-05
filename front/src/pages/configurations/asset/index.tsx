import React from 'react'
import type { NextPageWithLayout } from '@/types';
import { getLayout } from '@/components/layouts/layout';
import ModIndexClassicLayout from '@/components/layouts/mod-index-classic';
import { adminOnly } from '@/utils/auth-utils';
import HeaderDetails from '@/components/ui/headers/header-details';
import ModClassicLayout from '@/components/layouts/mod-classic';
import TicketIndex from '@/app/tickets';
import Configs from '@/app/configurations';
import AssetConfigsApp from '@/app/configurations/asset';
import { FrontPath } from '@/constants/enums/paths';


type Props = {}


const breadcrumbs = [
    {
        title: 'Configurations',
        route: FrontPath.CONFIGS,
        isHome: true,
    },
    {
        title: 'Asset',
        route: '#',
        isCurrent: true,
    },
];


const AssetConfigurations: NextPageWithLayout = () => {


    return (
        <>
            <ModClassicLayout breadcrumb={breadcrumbs}>
                <div className='pt-2'>
                    <AssetConfigsApp />
                </div>
            </ModClassicLayout>
        </>
    )
}
AssetConfigurations.getLayout = getLayout;

AssetConfigurations.authenticate = {
    permissions: adminOnly,
};

export default AssetConfigurations