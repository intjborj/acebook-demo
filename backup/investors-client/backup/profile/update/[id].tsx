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
import ProfileForm from '@/app/profile/form';
import { useRouter } from 'next/router';


type Props = {}

const variables = {
  type: 'grocery',
}
const ProfileUpdate: NextPageWithLayout = () => {
  const { query } = useRouter();
  const { searchType, id, ...restQuery } = query;

  return (
    <>
      <ModClassicLayout>
        <>
          <ProfileForm id={id as string} />
        </>
      </ModClassicLayout>
    </>
  )
}
ProfileUpdate.getLayout = getLayout;

ProfileUpdate.authenticate = {
  permissions: adminOnly,
};

export default ProfileUpdate