import React, { useState, useEffect } from 'react';
import type { NextPageWithLayout } from '@/types';
import { getLayout } from '@/components/layouts/layout';
import ModClassicLayout from '@/components/layouts/mod-classic';
import { useRouter } from 'next/router';
import AccountForm from '@/app/accounts/accForm';
import { useQuery } from '@apollo/client';
import { GET_DETAILED_ACC } from '@graphql/operations/accounts/accountQueries';
import _ from 'lodash';
import Spinner from '@/components/ui/loaders/spinner/spinner';
import { adminOnly } from '@/utils/auth-utils';
import { accFormDefaultValue } from '@/app/accounts/services/forms';

type Props = {};


const EditAccount: NextPageWithLayout = (props: Props) => {
  const { query } = useRouter();
  const { searchType, id, ...restQuery } = query;
  const [defaults, setDefaults] = useState<any>(null)

  const breadcrumbs = [
    {
      title: 'Investors',
      route: '/investors',
      isHome: true,
    },
    {
      title: 'Update',
      route: `#`,
      isCurrent: true,
    },
  ];

  const { data: accData, refetch } = useQuery(GET_DETAILED_ACC, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    variables: {
      "first": 1,
      "page": 1,
      "id": id,
      "type": "SPECIFIC_ID"
    }
  });


  useEffect(() => {

    if (accData) {

      let payload = accFormDefaultValue(accData)

      setDefaults(payload)
    }


  }, [accData])
  
  return (
    <div>
      <ModClassicLayout breadcrumb={breadcrumbs}>
        {
          defaults ? <AccountForm isInvestor={true} defaultValues={defaults} /> : <Spinner showText={false} />
        }

      </ModClassicLayout>
    </div>
  );
};
EditAccount.getLayout = getLayout;
EditAccount.authenticate = {
  permissions: adminOnly,
};

export default EditAccount;
