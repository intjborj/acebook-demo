import type { NextPageWithLayout } from '@/types';
import { getLayout } from '@/components/layouts/layout';
export { getStaticProps } from '@/framework/shops-page.ssr';
import ModClassicLayout from '@/components/layouts/mod-classic';
import HeaderDetails from '@/components/ui/headers/header-details';
import ACDataTable from '@/components/tables/data-table';
import DepartmentForm from '@/app/department/deptForm';
import AccountForm from '@/app/accounts/accForm';
import { adminOnly } from '@/utils/auth-utils';

const breadcrumbs = [
  {
    title: 'Accounts',
    route: '/accounts',
    isHome: true,
  },
  {
    title: 'Create',
    route: '/accounts/create',
    isCurrent: true,
  },
];

const CreateAccountPage: NextPageWithLayout = () => {
  return (
    <ModClassicLayout breadcrumb={breadcrumbs}>
      <>
          <AccountForm />
      </>
    </ModClassicLayout>
  );
};
CreateAccountPage.getLayout = getLayout;
CreateAccountPage.authenticate = {
  permissions: adminOnly,
};

export default CreateAccountPage;
