import React from 'react'
import type { NextPageWithLayout } from '@/types';
import { getLayout } from '@/components/layouts/layout';
import ModIndexClassicLayout from '@/components/layouts/mod-index-classic';
import { adminOnly } from '@/utils/auth-utils';
import HeaderDetails from '@/components/ui/headers/header-details';
import ModClassicLayout from '@/components/layouts/mod-classic';
import TicketIndex from '@/app/tickets';
import Configs from '@/app/configurations';


type Props = {}

const Configurations: NextPageWithLayout = () => {
   

    return (
        <>
            <ModClassicLayout>
                <>
                    <Configs />
                </>
            </ModClassicLayout>
        </>
    )
}
Configurations.getLayout = getLayout;

Configurations.authenticate = {
    permissions: adminOnly,
};

export default Configurations