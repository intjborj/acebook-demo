import React from 'react'
import { getLayout } from '@/components/layouts/layout';
import ModIndexClassicLayout from '@/components/layouts/mod-index-classic';
import { getAuthCredentials } from "@utils/auth-utils";
import _ from 'lodash'
import DepartmentFeedIndex from '@/app/department/feed';
import { adminOnly } from '@/utils/auth-utils';
import { useRouter } from 'next/router';
import { gql, useMutation, useSubscription } from '@apollo/client';
import SpecificPost from '@/app/posts/specific';
type Props = {}


const SpecPostIndex = (props: Props) => {
  const { token, permissions, id, user } = getAuthCredentials();
  const { query } = useRouter();
  const { searchType, id: queryId, ...restQuery } = query;


  return (
    <div>
      <ModIndexClassicLayout>
        <>
            <SpecificPost />
        </>
      </ModIndexClassicLayout>
    </div>
  )
}
SpecPostIndex.getLayout = getLayout;
SpecPostIndex.authenticate = {
  permissions: adminOnly,
};
export default SpecPostIndex