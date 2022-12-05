import React, { useState, useEffect } from 'react'
import type { NextPageWithLayout } from '@/types';
import { getLayout } from '@/components/layouts/layout';
import ModIndexClassicLayout from '@/components/layouts/mod-index-classic';
import PostFeedIndex, { PostQueryType } from '@/app/dashboard';
import { adminOnly } from '@/utils/auth-utils';
import PromotionSliders from '@/components/promotions/promotions';
import { getAuthCredentials } from '@/utils/auth-utils';
import _ from 'lodash';
import { useQuery } from '@apollo/client';
import { GET_PROMOTIONS } from '@graphql/operations/promotions/promotionQueries';

const variables = {
  type: 'grocery',
}

const IndexPage: NextPageWithLayout = () => {
  const [isMounted, setIsMounted] = useState<boolean>(true)
  const { user } = getAuthCredentials();

  const { data: allPromotions, refetch } = useQuery(GET_PROMOTIONS, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });


  useEffect(() => {
    return () => {
      setIsMounted(false)
    }
  }, [])

  let queryVar : PostQueryType = {
    departmentId: _.get(user, "departmentOnDuty._id"),
    type: "privacy",
    user: _.get(user, "_id"),
    privacy: true,
    // skip: 0,
    page: 1,
    perPage: 20
    // perPage: 50
  }

  return (
    <>
      {
        isMounted &&
        <>
          {(allPromotions && _.get(allPromotions, "promotions.data").length > 0) &&
            <PromotionSliders
              variables={variables}
              promotionals={_.get(allPromotions, "promotions.data")}
            />}
          <ModIndexClassicLayout>
            <PostFeedIndex queryVar={queryVar} />
          </ModIndexClassicLayout>
        </>
      }
    </>
  )
}
IndexPage.getLayout = getLayout;

IndexPage.authenticate = {
  permissions: adminOnly,
};

export default IndexPage