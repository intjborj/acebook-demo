import React from 'react'
import { getLayout } from '@/components/layouts/layout';
import ModIndexClassicLayout from '@/components/layouts/mod-index-classic';
import { getAuthCredentials } from "@utils/auth-utils";
import _ from 'lodash'
import DepartmentFeedIndex from '@/app/department/feed';
import { adminOnly } from '@/utils/auth-utils';
import PostFeedIndex, { PostQueryType } from '@/app/dashboard';
type Props = {}

const SpecificDepartment = (props: Props) => {
    const { token, permissions, id, user } = getAuthCredentials();


    let queryVar : PostQueryType = {
        departmentId: null,
        type: 'specific_user',
        user: _.get(user, "_id"),
        privacy: false,
        // skip: 0,
        page: 1,
        perPage: 10
    }

    return (
        <div>
            <ModIndexClassicLayout>
                <>
                    <PostFeedIndex queryVar={queryVar}  menuDisplay={["archives","myPosts"]}/>
                    {/* <DepartmentFeedIndex  departmentId={_.get(user, "departmentOnDuty._id")} /> */}
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