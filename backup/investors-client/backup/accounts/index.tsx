import type { NextPageWithLayout } from '@/types';
import { getLayout } from '@/components/layouts/layout';
export { getStaticProps } from '@/framework/shops-page.ssr';
import ModClassicLayout from '@/components/layouts/mod-classic';
import HeaderDetails from '@/components/ui/headers/header-details';
import ACDataTable from '@/components/tables/data-table';
import { useQuery } from '@apollo/client';
import { GET_ALL_ACCS } from '@graphql/operations/accounts/accountQueries';
import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import TitleWithSort from '@admin/components/ui/title-with-sort';
import { useIsRTL } from '@/utils/locals';
import ActionButtons from "@admin/components/common/action-buttons";
import {
  SortOrder,
} from '__generated__/__types__';
import { adminOnly } from '@/utils/auth-utils';

const initialState = {
  accData: [],
};

const AccountsPage: NextPageWithLayout = () => {
  const [state, setState] = useState(initialState);
  const { alignLeft, alignRight } = useIsRTL();

  const [order, setOrder] = useState<SortOrder>(SortOrder.Desc);
  const [column, setColumn] = useState<string>();

  const { data: allAccs, refetch } = useQuery(GET_ALL_ACCS, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });

  useEffect(() => {
    if (_.get(allAccs, 'accounts.data')) {
      const structuredAcc = _.get(allAccs, 'accounts.data').map((item: any) => {
        return {
          id: item._id,
          department: item?.departmentOnDuty?.name,
          name:
            item?.lastName.toUpperCase() + ', ' + item?.firstName.toUpperCase(),
        };
      });
      setState((p) => ({ ...p, accData: structuredAcc }));
    }
  }, [allAccs]);

  // console.log('allAccs', _.get(allAccs, 'accounts.data'));

  const columns = [
    // {
    //   title:"ID",
    //   dataIndex: 'id',
    //   key: 'id',
    //   align: 'center',
    //   width: 60,
    // },
    {
      title: (
        <TitleWithSort
          title={"Name"}
          ascending={true}
          isActive={true}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'name',
      key: 'name',
      align: alignLeft,
      // onHeaderCell: () => onHeaderClick(QueryTagsOrderByColumn.Name),
    },
    {
      title: "Department",
      dataIndex: 'department',
      key: 'department',
      align: 'left',
      ellipsis: true,
    },
    {
      title: "Actions",
      dataIndex: 'id',
      key: 'actions',
      align: 'center',
      width: 90,
      render: (id: string) => (
        <ActionButtons
          id={id}
          editUrl={`/accounts/${id}`}
          // editUrl={`${ROUTES.TAGS}/${id}/edit`}
          deleteModalView="DELETE_TAG"
        />
      ),
    },
  ];

  return (
    <ModClassicLayout>
      {/* Transfered to ModClassicLayout component */}
      {/* <div className="bg-gray min-h-screen  ">
        <div className="mx-auto flex w-full max-w-none flex-col  pt-14"> */}
      <>
        <HeaderDetails
          title={'Accounts'}
          buttonName={'+ New Account'}
          buttonRoute={'/accounts/create'}
        />

        <ACDataTable columns={columns} data={state.accData} />
      </>
      {/* </div>
      </div> */}
    </ModClassicLayout>
  );
};
AccountsPage.getLayout = getLayout;

AccountsPage.authenticate = {
  permissions: adminOnly,
};
export default AccountsPage;
