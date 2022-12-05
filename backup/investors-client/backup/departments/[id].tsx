import React from 'react'
import { getLayout } from '@/components/layouts/layout';
import ModIndexClassicLayout from '@/components/layouts/mod-index-classic';
import { getAuthCredentials } from "@utils/auth-utils";
import _ from 'lodash'
import DepartmentFeedIndex from '@/app/department/feed';
import { adminOnly } from '@/utils/auth-utils';
type Props = {}

const SpecificDepartment = (props: Props) => {
    const { token, permissions, id, user } = getAuthCredentials();


    return (
        <div>
            <ModIndexClassicLayout>
                <>
                    <DepartmentFeedIndex  departmentId={_.get(user, "departmentOnDuty._id")} />
                </>
            </ModIndexClassicLayout>
        </div>
    )
}
SpecificDepartment.getLayout = getLayout;
SpecificDepartment.authenticate = {
  permissions: adminOnly,
};
export default SpecificDepartment