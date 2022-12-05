import React from 'react'
import type { NextPageWithLayout } from '@/types';
import { getLayout } from '@/components/layouts/layout';
import ModIndexClassicLayout from '@/components/layouts/mod-index-classic';
import { adminOnly } from '@/utils/auth-utils';
import HeaderDetails from '@/components/ui/headers/header-details';
import ModClassicLayout from '@/components/layouts/mod-classic';
import TicketIndex from '@/app/tickets';
import DashboardLayout from '@/layouts/_dashboard';
import ProfileApp from '@/app/profile';

type Props = {}

const variables = {
  type: 'grocery',
}
const Profile: NextPageWithLayout = () => {

  
  return (
    <>
      <ModClassicLayout>
        <>
        <ProfileApp/>
        </>
      </ModClassicLayout>
    </>
  )
}
Profile.getLayout = getLayout;

Profile.authenticate = {
  permissions: adminOnly,
};

export default Profile