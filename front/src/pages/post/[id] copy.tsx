import React from 'react'
import { getLayout } from '@/components/layouts/layout';
import ModIndexClassicLayout from '@/components/layouts/mod-index-classic';
import { getAuthCredentials } from "@utils/auth-utils";
import _ from 'lodash'
import DepartmentFeedIndex from '@/app/department/feed';
import { adminOnly } from '@/utils/auth-utils';
import { useRouter } from 'next/router';
import { gql, useMutation, useSubscription } from '@apollo/client';
type Props = {}

const COMMENTS_SUBSCRIPTION = gql`
subscription Pong {
    pong {
      pingId
    }
  }	
`;


const SpecPost = (props: Props) => {
  const { token, permissions, id, user } = getAuthCredentials();
  const { query } = useRouter();
  const { searchType, id: queryId, ...restQuery } = query;

  const { data, loading, error } = useSubscription(
    gql`
    subscription Subscription($input: PingInpt!) {
      pong(input: $input) {
        pingId
      }
    }
    
      `,
    {
      variables: {
        input: {
          repoFullName: "thisrepojack"
        }
      }
    }
  );


  return (
    <div>
      <ModIndexClassicLayout>
        <>
          {data?.pong?.pingId} ----
        </>
      </ModIndexClassicLayout>
    </div>
  )
}
SpecPost.getLayout = getLayout;
SpecPost.authenticate = {
  permissions: adminOnly,
};
export default SpecPost