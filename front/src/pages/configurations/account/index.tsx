import React from 'react'
import type { NextPageWithLayout } from '@/types';
import { getLayout } from '@/components/layouts/layout';
import ModIndexClassicLayout from '@/components/layouts/mod-index-classic';
import { adminOnly } from '@/utils/auth-utils';
import HeaderDetails from '@/components/ui/headers/header-details';
import ModClassicLayout from '@/components/layouts/mod-classic';
import TicketIndex from '@/app/tickets';
import Configs from '@/app/configurations';
import AccountConfigurations from '@/app/configurations/account';
import { FrontPath } from '@/constants/enums/paths';


type Props = {}

const AccountConfigsIndex: NextPageWithLayout = () => {
    const breadcrumbs = [
        {
            title: 'Configurations',
            route: FrontPath.CONFIGS,
            isHome: true,
        },
        {
            title: 'Account',
            route: '#',
            isCurrent: true,
        },
    ];


    return (
        <>
            <ModClassicLayout breadcrumb={breadcrumbs}>
                <>
                    <AccountConfigurations />
                    {/* <AccountConfigsIndex /> */}
                </>
            </ModClassicLayout>
        </>
    )
}
AccountConfigsIndex.getLayout = getLayout;

AccountConfigsIndex.authenticate = {
    permissions: adminOnly,
};

export default AccountConfigsIndex