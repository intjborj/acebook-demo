// Dependencies
import React, { useState, useEffect } from 'react'
// Hooks
import { PostContextRd } from '@/reducers/posts/postContextRd';
// Custom Components
import HeaderDetails from '@/components/ui/headers/header-details';
import ABTransition from '@/components/customs/transitions/ABTransition';
import TicketMainCard from './ticketMainCard';
import { FilterFields, FilterFormType } from '@/components/customs/forms/ABFormFilter';

type Props = {}
type SearchDataType = {
  isSearch?: boolean;
  description?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
  ticketType?: string;
}

const TicketIndex = (props: Props) => {
  const [statePostRd, dispatchPostRd] = React.useContext<any>(PostContextRd)
  const [state, setState] = useState<SearchDataType>({})
  const [isMounted, setIsMounted] = useState<boolean>(true)

  useEffect(() => {
    return () => {
      setIsMounted(false)
    }
  }, [])


  const getSearchInput = (data: any) => {

    if (data.searchText && data.searchText != '') {
      setState((p) => ({
        ...p,
        isSearch: true,
        description: data?.searchText
      }))
    } else {
      setState((p) => ({
        ...p,
        isSearch: false,
      }))
    }

  }

  const getFilterInputs = (data: FilterFormType) => {

    if (data.startDate != "" || data.endDate != "" || (data.status != "" && data.status != null) || (data.type != "" && data.type != null)) {
      setState((p) => ({
        ...p,
        isSearch: true,
        startDate: data.startDate,
        endDate: data.endDate,
        status: data.status?.code,
        ticketType: data.type?.code
      }))
    } else {
      setState((p) => ({
        ...p,
        isSearch: false,
      }))
    }


  }

  return (
    <div>
      {isMounted &&
        <>
          <HeaderDetails
            filterInput={getFilterInputs}
            searchInput={getSearchInput}
            subtitle={statePostRd.content}
            title={'Tickets'}
            buttonName={'+ Create Ticket'}
            buttonRoute={'/tickets/form'}
            filterFields={[FilterFields.DATE_RANGE, FilterFields.STATUS, FilterFields.TICKET_TYPE]}
            dateRangeLabel={"Requested Date"}
          />
          <ABTransition>
            {/* <TicketMain /> */}
            <TicketMainCard searchData={state.isSearch == true ? {
              isSearch: state.isSearch,
              description: state.description,
              startDate: state.startDate,
              endDate: state.endDate,
              status: state.status,
              ticketType: state.ticketType
            } : null} />
          </ABTransition>
        </>
      }
    </div>
  )
}

export default TicketIndex