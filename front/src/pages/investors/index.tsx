import type { NextPageWithLayout } from '@/types';
import { getLayout } from '@/components/layouts/layout';
export { getStaticProps } from '@/framework/shops-page.ssr';
import ModClassicLayout from '@/components/layouts/mod-classic';
import HeaderDetails from '@/components/ui/headers/header-details';
import ACDataTable from '@/components/tables/data-table';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_ACCS, SEARCH_ACCS } from '@graphql/operations/accounts/accountQueries';
import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import TitleWithSort from '@admin/components/ui/title-with-sort';
import { useIsRTL } from '@/utils/locals';
import ActionButtons from "@admin/components/common/action-buttons";
import {
  SortOrder,
} from '__generated__/__types__';
import { adminOnly } from '@/utils/auth-utils';
import { GET_INVESTOR_CONFIG } from '@graphql/operations/investors/investorsQueries';
import { toast } from 'react-toastify';
import { DELETE_ACCOUNT } from '@graphql/operations/accounts/accountMutations';
import { SEARCH_INVESTORS } from '@graphql/operations/tickets/ticketQueries';

const initialState = {
  accData: [],
};

const AccountsPage: NextPageWithLayout = () => {
  const [state, setState] = useState(initialState);
  const { alignLeft, alignRight } = useIsRTL();

  const [order, setOrder] = useState<SortOrder>(SortOrder.Desc);
  const [column, setColumn] = useState<string>();

  const [delAcc] = useMutation(DELETE_ACCOUNT);

  const { data: configData, loading } = useQuery(GET_INVESTOR_CONFIG, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });

  const { data: allAccs, refetch } = useQuery(GET_ALL_ACCS, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    variables: {
      type: "ACCOUNTS_INVESTORS"
    }
  });

  const handleRestructureData = (data: any)=>{
    const structuredAcc = data.map((item: any) => {
      return {
        id: item._id,
        department: item?.departmentOnDuty?.name,
        name:
          (item?.lastName && item?.lastName ? item?.lastName?.toUpperCase() + ', ' + item?.firstName?.toUpperCase() : ""),
        investorDetails: item?.investorDetails
      };
    });

    return structuredAcc
  }

  useEffect(() => {
    if (_.get(allAccs, 'accounts.data')) {
      const structuredAcc = handleRestructureData(_.get(allAccs, 'accounts.data'))
      setState((p) => ({ ...p, accData: structuredAcc }));
    }
  }, [allAccs]);

  const calculateVotes = (block: number) => {

    const sharesPerBlock = _.get(configData, "compConfigs.data[0].investor.sharesPerBlock")
    const votesPerShare = _.get(configData, "compConfigs.data[0].investor.votesPerShare")

    if (block && sharesPerBlock && votesPerShare) {
      let shares = block * sharesPerBlock;
      let votes = shares * votesPerShare;
    
      return votes
    } else {
      return 0
    }
  }

  const deleteAcc = (id: string) => {
    if (confirm("Are you sure you want to delete user?")) {
      delAcc({
        variables: {
          id: id
        },
      })
        .then((resp) => {
          toast.success('User successfully deleted');
          refetch()
        })
        .catch((error) => {
          toast.error('User failed to delete');
        });
    }
  }


  const columns = [
    {
      title: "ID No.",
      dataIndex: 'investorDetails',
      key: 'investorDetails',
      align: 'left',
      ellipsis: true,
      width: 90,
      render: (record: any) => (
        <>{record.investorId}</>
      )
    },
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
    },
    {
      title: "Blocks",
      dataIndex: 'investorDetails',
      key: 'investorDetails',
      align: 'left',
      ellipsis: true,
      render: (record: any) => (
        <>{record.blocks}</>
      )
    },
    {
      title: "Available Votes",
      dataIndex: 'investorDetails',
      key: 'investorDetails',
      align: 'left',
      ellipsis: true,
      render: (record: any) => (
        <>{calculateVotes(parseInt(record.blocks))}</>
      )
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
          editUrl={`/investors/${id}`}
          // editUrl={`${ROUTES.TAGS}/${id}/edit`}
          callbackType={"REMOVE"}
          callbackFunction={() => deleteAcc(id)}
        />
      ),
    },
  ];

  const { data: searchedUser, refetch: refectUsSearch } = useQuery(SEARCH_INVESTORS, {
    variables: {
      name: null
    },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });

  // const getUserInputChange = (data: any) => {
  //   if (data != null || data != undefined || data != " ") {
  //     setTimeout(function () {
  //       refectUsSearch({
  //         name: data
  //       })
  //     }, 500);
  //   }
  // }

  const handleChangeSearch = (data:any)=>{
    if (data != null || data != undefined || data != " ") {
      setTimeout(function () {
        refectUsSearch({
          name: data
        })
      }, 500);
    }
   
  }
  useEffect(() => {

    if(searchedUser && _.get(searchedUser, "search_investors.data").length > 0){
      const structuredAcc = handleRestructureData(_.get(searchedUser, "search_investors.data"))
      setState((p) => ({ ...p, accData: structuredAcc }));
    }
   
  }, [searchedUser])
  
  return (
    <ModClassicLayout>
      <>
        <HeaderDetails
          title={'Investors'}
          buttonName={'+ Add Investors'}
          buttonRoute={'/investors/create'}
          onSearchChangeInput={handleChangeSearch}
        />

        <ACDataTable columns={columns} data={state.accData} />
      </>
    </ModClassicLayout>
  );
};
AccountsPage.getLayout = getLayout;

AccountsPage.authenticate = {
  permissions: adminOnly,
};
export default AccountsPage;
