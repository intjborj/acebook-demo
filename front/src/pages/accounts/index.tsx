import type { NextPageWithLayout } from '@/types';
import { getLayout } from '@/components/layouts/layout';
export { getStaticProps } from '@/framework/shops-page.ssr';
import ModClassicLayout from '@/components/layouts/mod-classic';
import HeaderDetails from '@/components/ui/headers/header-details';
import ACDataTable from '@/components/tables/data-table';
import { useQuery } from '@apollo/client';
import { GET_ALL_ACCS } from '@graphql/operations/accounts/accountQueries';
import _, { isEmpty } from 'lodash';
import React, { useState, useEffect } from 'react';
import TitleWithSort from '@admin/components/ui/title-with-sort';
import { useIsRTL } from '@/utils/locals';
import ActionButtons from "@admin/components/common/action-buttons";
import {
  SortOrder,
} from '__generated__/__types__';
import { adminOnly } from '@/utils/auth-utils';
import { useUserSearch } from '@/hooks/useUserSearch';
import { FilterFields, FilterFormType } from '@/components/customs/forms/ABFormFilter';
import NoData from '@/components/customs/information/noData';
import { isMobile } from 'react-device-detect';
type StateType = {
  accData: any;
  searchData: any;
}
const initialState = {
  accData: [],
  searchData: {}
};
const queryType = "ACCOUNTS_ACE_EMPLOYEES"
const dataPerPage = 20
const AccountsPage: NextPageWithLayout = () => {
  const [state, setState] = useState<StateType>(initialState);
  const { alignLeft, alignRight } = useIsRTL();

  const [order, setOrder] = useState<SortOrder>(SortOrder.Desc);
  const [column, setColumn] = useState<string>();
  const { result: userResult, search: searchUser } = useUserSearch()

  const { data: allAccs, refetch } = useQuery(GET_ALL_ACCS, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    variables: {
      type: queryType,
      searchArg: null,
      perPage: dataPerPage,
      page: 1,
    }
  });

  const restructAccData = (accounts: any) => {
    if (!isEmpty(accounts)) {
      const structuredAcc = accounts.map((item: any) => {
        return {
          id: item._id,
          department: item?.departmentOnDuty?.name,
          username: item?.username,
          name:
            item?.lastName.toUpperCase() + ', ' + item?.firstName.toUpperCase(),
        };
      });
      setState((p) => ({ ...p, accData: structuredAcc }));
    }
  }

  useEffect(() => {
    if (_.get(allAccs, 'accounts.data')) {
      if (_.get(allAccs, 'accounts.data').length == 0) {
        setState((p) => ({ ...p, accData: [] }));
      } else {
        restructAccData(_.get(allAccs, 'accounts.data'))
      }

    }
  }, [allAccs]);

  useEffect(() => {

    if (!isEmpty(userResult) || userResult.length > 0) {
      restructAccData(userResult)
    } else {
      restructAccData(_.get(allAccs, 'accounts.data'))
    }

  }, [userResult])

  let columns: any = [
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
      title: "Username",
      dataIndex: 'username',
      key: 'username',
      align: 'left',
      ellipsis: true,
    },

  ];

  let actionCols = [
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
        />
      ),
    }]

  if (isMobile) {
    columns = [...actionCols, ...columns]
  } else {
    columns = [...columns, ...actionCols]
  }







  const handleChangeSearch = (data: any) => {

    if (!isEmpty(data) || !isEmpty(data.searchText) || data.length > 0) {
      searchUser(data.searchText)
    } else {
      restructAccData(_.get(allAccs, 'accounts.data'))
    }

  }
  const getFilterInputs = (data: FilterFormType) => {


    if (!isEmpty(data.department)) {
      let searchDet = {
        "department": _.get(data, "department._id"),
        "isSearch": true
      }

      let payload: any = {
        type: queryType,
        "searchArg": searchDet,
        perPage: dataPerPage,
        page: 1,
      }
      setState((p) => ({ ...p, searchData: searchDet }))
      refetch(payload)
    } else {
      setState((p) => ({ ...p, searchData: null }))
      refetch({
        type: queryType,
        searchArg: null,
        perPage: dataPerPage,
        page: 1,
      })
    }
  }

  const pageChange = (page: number) => {
   
    refetch({
      type: queryType,
      searchArg: state.searchData,
      perPage: dataPerPage,
      page: page,
    })
  }

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
          searchInput={handleChangeSearch}
          filterInput={getFilterInputs}
          filterFields={[FilterFields.DEPARTMENT]}
        />

        {state.accData.length > 0 ? <ACDataTable pageChange={pageChange} paginationInfo={_.get(allAccs, 'accounts.paginatorInfo')} columns={columns} data={state.accData} /> : <NoData />}
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
