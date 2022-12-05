import { getLayout } from '@/components/layouts/layout';
import ModClassicLayout from '@/components/layouts/mod-classic';
import DepartmentForm from '@/app/department/deptForm';
import { adminOnly } from '@/utils/auth-utils';
import { useRouter } from 'next/router';
import { useFetchDepartment } from '@/hooks/useFetchDepartment';
import _, { isEmpty } from "lodash"
const breadcrumbs = [
  {
    title: "Departments",
    route: "/departments",
    isHome: true,
  },
  {
    title: "Update",
    route: "#",
    isCurrent: true,
  }
]

function updateDeptPage() {

  const { query } = useRouter();
  const { searchType, id: queryId, ...restQuery } = query;

  const {result } = useFetchDepartment({id: queryId as string,type:"specific"})
 
  return (
    <>
      <ModClassicLayout breadcrumb={breadcrumbs}>
        <>
         {!isEmpty(result) && <DepartmentForm defaults={{
            _id: _.get(result, "_id"),
            deptName: _.get(result, "name"),
            description: _.get(result, "description"),
          }} />}
        </>
      </ModClassicLayout>
    </>
  );
}

updateDeptPage.getLayout = getLayout;
updateDeptPage.authenticate = {
  permissions: adminOnly,
};
export default updateDeptPage;
