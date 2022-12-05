import React from 'react'
import type { NextPageWithLayout } from '@/types';
import { getLayout } from '@/components/layouts/layout';
import { adminOnly } from '@/utils/auth-utils';
import ModClassicLayout from '@/components/layouts/mod-classic';
import TicketIndex from '@/app/tickets';
import FeedbackCategoryApp from '@/app/feedback/category';
import FeedbackApp from '@/app/feedback';


type Props = {}

const FeedbackIndex: NextPageWithLayout = () => {
    return (
        <>
            <ModClassicLayout >
                <>
                    <FeedbackApp />
                </>
            </ModClassicLayout>
        </>
    )
}
FeedbackIndex.getLayout = getLayout;

FeedbackIndex.authenticate = {
    permissions: adminOnly,
};

export default FeedbackIndex