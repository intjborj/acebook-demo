import React from 'react'
import type { NextPageWithLayout } from '@/types';
import { getLayout } from '@/components/layouts/layout';
import { adminOnly } from '@/utils/auth-utils';
import TicketForm from '@/app/tickets/form';
import ModClassicLayout from '@/components/layouts/mod-classic';
import moment from 'moment';
import { getAuthCredentials } from '@/utils/auth-utils';
import _ from 'lodash';

const breadcrumbs = [
  {
    title: 'Tickets',
    route: '/tickets',
    isHome: true,
  },
  {
    title: 'Create',
    route: '/tickets/form',
    isCurrent: true,
  },
];

const CreateTicketForm: NextPageWithLayout = () => {
  const { user } = getAuthCredentials();
  return (
    <>
      <ModClassicLayout breadcrumb={breadcrumbs}>
        <>
          <TicketForm isNew={true} postDefault={{ 
             dateRequested: moment().format("YYYY-MM-DDTHH:mm"),
             createdBy: user,
             requestedBy: user,
             requestingDepartment: _.get(user, "departmentOnDuty")
             }}/>
        </>
      </ModClassicLayout>
    </>
  )
}
CreateTicketForm.getLayout = getLayout;

CreateTicketForm.authenticate = {
  permissions: adminOnly,
};

export default CreateTicketForm