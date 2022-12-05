import React from 'react'
import type { NextPageWithLayout } from '@/types';
import { getLayout } from '@/components/layouts/layout';
import { adminOnly } from '@/utils/auth-utils';
import ModClassicLayout from '@/components/layouts/mod-classic';
import ManufacturerApp from '@/app/configurations/asset/manufacturer';
import AssManufacturerForm from '@/app/configurations/asset/manufacturer/form';
import { FrontPath } from '@/constants/enums/paths';

type Props = {}

const breadcrumbs = [
    {
      title: 'Manufacturers',
      route: FrontPath.ASSET_MANUFACTURERS,
      isHome: true,
    },
    {
      title: 'Create',
      route: '#',
      isCurrent: true,
    },
  ];

  
const ManufacturerFormIndex: NextPageWithLayout = () => {

    return (
        <>
            <ModClassicLayout breadcrumb={breadcrumbs}>
                <>
                    <AssManufacturerForm />
                </>
            </ModClassicLayout>
        </>
    )
}
ManufacturerFormIndex.getLayout = getLayout;

ManufacturerFormIndex.authenticate = {
    permissions: adminOnly,
};

export default ManufacturerFormIndex