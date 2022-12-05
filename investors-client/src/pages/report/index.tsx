import React from 'react'
import type { NextPageWithLayout } from '@/types';
import { getLayout } from '@/components/layouts/layout';
import ModIndexClassicLayout from '@/components/layouts/mod-index-classic';
import DashboardIndex from '@/app/dashboard';
import { adminOnly, investorOnly } from '@/utils/auth-utils';
import PromotionSliders from '@/components/promotions/promotions';
import ModIndexClassicLayoutPoll from '@/components/layouts/mod-index-classic-poll';
import PollIndex from '@/app-poll/poll';
import { ALL_RESTRCITIONS, POLL_RESULTS, POLL_VOTING } from '@/utils/constants';
import PollReport from '@/app-poll/report';

type Props = {}

const IndexPage: NextPageWithLayout = () => {

  return (
    <>
      {/* <PromotionSliders
        variables={variables}
      /> */}

      <ModIndexClassicLayoutPoll>
        <>
         <PollReport/>
        </>
      </ModIndexClassicLayoutPoll>
    </>
  )
}
IndexPage.getLayout = getLayout;

IndexPage.authenticate = {
  permissions: [POLL_RESULTS, ALL_RESTRCITIONS],
};

export default IndexPage