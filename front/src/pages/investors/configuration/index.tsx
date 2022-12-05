import type { NextPageWithLayout } from '@/types';
import { getLayout } from '@/components/layouts/layout';
export { getStaticProps } from '@/framework/shops-page.ssr';
import ModClassicLayout from '@/components/layouts/mod-classic';
import HeaderDetails from '@/components/ui/headers/header-details';
import ACDataTable from '@/components/tables/data-table';
import { useQuery } from '@apollo/client';
import { GET_ALL_ACCS } from '@graphql/operations/accounts/accountQueries';
import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import TitleWithSort from '@admin/components/ui/title-with-sort';
import { useIsRTL } from '@/utils/locals';
import ActionButtons from "@admin/components/common/action-buttons";
import {
  SortOrder,
} from '__generated__/__types__';
import { adminOnly } from '@/utils/auth-utils';
import InvConfigApp from '@/app/investors/configuration';

type Props = {}

const ConfigInvestor = (props: Props) => {
  return (
    <ModClassicLayout>
      <>
      <InvConfigApp/>
      </>
    </ModClassicLayout>
  )
}
ConfigInvestor.getLayout = getLayout;

ConfigInvestor.authenticate = {
  permissions: adminOnly,
};
export default ConfigInvestor