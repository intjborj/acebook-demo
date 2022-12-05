import React from 'react'
import type { NextPageWithLayout } from '@/types';
import { getLayout } from '@/components/layouts/layout';
import { adminOnly } from '@/utils/auth-utils';
import ModClassicLayout from '@/components/layouts/mod-classic';
import TicketIndex from '@/app/tickets';
import FeedbackCategoryApp from '@/app/feedback/category';


type Props = {}
const breadcrumbs = [
    {
        title: 'Configurations',
        route: '/configurations',
        isHome: true,
    },
    {
        title: 'Feedback settings',
        route: '',
        isCurrent: true,
    },
];
const FeedbackCategory: NextPageWithLayout = () => {
    return (
        <>
            <ModClassicLayout breadcrumb={breadcrumbs}>
                <>
                    <FeedbackCategoryApp />
                </>
            </ModClassicLayout>
        </>
    )
}
FeedbackCategory.getLayout = getLayout;

FeedbackCategory.authenticate = {
    permissions: adminOnly,
};

export default FeedbackCategory