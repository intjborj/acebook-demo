import React, { useEffect, useMemo, useState } from 'react'
import { useQuery } from '@apollo/client';
import { GET_WORKREPORT } from '@graphql/operations/tickets/ticketQueries';
import { getAuthCredentials } from "@utils/auth-utils";
import _ from 'lodash';
import ACDataTable from '@/components/tables/data-table';
import { useIsRTL } from '@/utils/locals';
import ABTransition from '@/components/customs/transitions/ABTransition';
import ActionButtons from '@/components/admin/components/common/action-buttons';
import WorkCardReportMain from '../components/reports/workCardDisplay';
import NoData from '@/components/customs/information/noData';
import ABPagination from '@/components/customs/pagination/ABPagination';
import { PaginationProps } from '@/components/customs/pagination/ABPagination/pagination';

type Props = {
  fetchCode?: string;
  searchData?: any
}
type StateType = {
  workReportData?: any;
  perPage?: number;
  currentPage?: number;
}



const ReceivedWorks = ({ fetchCode, searchData }: Props) => {
  const { user } = getAuthCredentials();
  const { alignLeft, alignRight } = useIsRTL();
  const [state, setState] = useState<StateType>({
    perPage: 10,
    currentPage: 1,
    workReportData: null
  })

  const { data: workReport, refetch, error, loading: workLoading } = useQuery(GET_WORKREPORT, {
    variables: {
      department: _.get(user, "departmentOnDuty._id"),
      type: fetchCode,
      searchArg: searchData,
      perPage: state.perPage,
      page: state.currentPage
    },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });
 

  useMemo(() => {
   
    if (fetchCode) {
      refetch({
        department: _.get(user, "departmentOnDuty._id"),
        type: fetchCode,
        searchArg: null,
        perPage: state.perPage,
        page: 1
      })
    }
  }, [fetchCode])

  useMemo(() => {
    
    if (searchData  ) {
      refetch({
        type: fetchCode,
        department: _.get(user, "departmentOnDuty._id"),
        searchArg: searchData,
        perPage: state.perPage,
        page: 1
      })
    }
  }, [searchData])
 

  const pageChange = (page: number) => {
    refetch({
      type: fetchCode,
      department: _.get(user, "departmentOnDuty._id"),
      searchArg: searchData,
      perPage: state.perPage,
      page: page
    })
  }

  return (
    <div>
      <ABTransition>
        {_.get(workReport, "workDetailReports.data") && _.get(workReport, "workDetailReports.data").length > 0 ?
          <>
            <WorkCardReportMain data={_.get(workReport, "workDetailReports.data")} />
            <ABPagination pageInfo={_.get(workReport, "workDetailReports.paginatorInfo") as PaginationProps} pageChange={pageChange} />
          </>
          : <NoData />}
      </ABTransition>
    </div>
  )
}

export default ReceivedWorks