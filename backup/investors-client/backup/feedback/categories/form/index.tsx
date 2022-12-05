import React from 'react'
import type { NextPageWithLayout } from '@/types';
import { getLayout } from '@/components/layouts/layout';
import ModIndexClassicLayout from '@/components/layouts/mod-index-classic';
import { adminOnly } from '@/utils/auth-utils';
import HeaderDetails from '@/components/ui/headers/header-details';
import ModClassicLayout from '@/components/layouts/mod-classic';
import TicketIndex from '@/app/tickets';
import Configs from '@/app/configurations';
import FbCategoryForm from '@/app/feedback/category/form';


type Props = {}

const breadcrumbs = [
    {
        title: 'Configurations',
        route: '/configurations',
        isHome: true,
    },
    {
        title: 'Feedback settings',
        route: '/feedback/categories',
        
    },
    {
        title: 'Form',
        route: '',
        isCurrent: true,
    },
];

const FbCatForm: NextPageWithLayout = () => {


    return (
        <>
            <ModClassicLayout breadcrumb={breadcrumbs}>
                <>
                    <FbCategoryForm />
                </>
            </ModClassicLayout>
        </>
    )
}
FbCatForm.getLayout = getLayout;

FbCatForm.authenticate = {
    permissions: adminOnly,
};

export default FbCatForm