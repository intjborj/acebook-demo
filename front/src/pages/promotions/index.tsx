// Dependencies
import React from 'react'
// Constants
import type { NextPageWithLayout } from '@/types';
import { adminOnly } from '@/utils/auth-utils';
// Custom Components
import { getLayout } from '@/components/layouts/layout';
import ModClassicLayout from '@/components/layouts/mod-classic';
import PromotionApp from '@/app/promotions';
import { FrontPath } from '@/constants/enums/paths';

const Promotions: NextPageWithLayout = () => {
  const breadcrumbs = [
    {
      title: 'Configurations',
      route: FrontPath.CONFIGS,
      isHome: true,
    },
    {
      title: 'Promotions',
      route: '#',
      isCurrent: true,
    },
  ];


  return (
    <>
      <ModClassicLayout breadcrumb={breadcrumbs}>
        <>
          <PromotionApp />
        </>
      </ModClassicLayout>
    </>
  )
}
Promotions.getLayout = getLayout;

Promotions.authenticate = {
  permissions: adminOnly,
};

export default Promotions