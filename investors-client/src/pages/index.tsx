import React from 'react'
import type { NextPageWithLayout } from '@/types';
import { getLayout } from '@/components/layouts/layout';
import ModIndexClassicLayout from '@/components/layouts/mod-index-classic';
import DashboardIndex from '@/app/dashboard';
import { adminOnly, investorOnly } from '@/utils/auth-utils';
import PromotionSliders from '@/components/promotions/promotions';
import ModIndexClassicLayoutPoll from '@/components/layouts/mod-index-classic-poll';
import PollIndex from '@/app-poll/poll';
import { ALL_RESTRCITIONS, POLL_VOTING } from '@/utils/constants';

type Props = {}

const IndexPage: NextPageWithLayout = () => {

  return (
    <>
      {/* <PromotionSliders
        variables={variables}
      /> */}

      <ModIndexClassicLayoutPoll>
        <>
          <PollIndex />
        </>
      </ModIndexClassicLayoutPoll>
    </>
  )
}
IndexPage.getLayout = getLayout;

IndexPage.authenticate = {
  permissions: [POLL_VOTING, ALL_RESTRCITIONS],
};

export default IndexPage