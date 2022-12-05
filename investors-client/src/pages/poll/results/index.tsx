import React from 'react'
import type { NextPageWithLayout } from '@/types';
import { getLayout } from '@/components/layouts/layout';
import { adminOnly, investorAdminOnly, investorOnly } from '@/utils/auth-utils';
import ModIndexClassicLayoutPoll from '@/components/layouts/mod-index-classic-poll';
import PollResultsIndex from '@/app-poll/pollResults';
import { ALL_RESTRCITIONS, POLL_RESULTS } from '@/utils/constants';


type Props = {}

const PollResultsPage: NextPageWithLayout = () => {


  return (
    <>
      <ModIndexClassicLayoutPoll>
        <>
          <PollResultsIndex />
        </>
      </ModIndexClassicLayoutPoll>
    </>
  )
}
PollResultsPage.getLayout = getLayout;

PollResultsPage.authenticate = {
  permissions: [POLL_RESULTS, ALL_RESTRCITIONS],
};

export default PollResultsPage