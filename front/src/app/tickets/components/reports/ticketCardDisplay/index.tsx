import ABTransition from '@/components/customs/transitions/ABTransition'
import ModClassicLayout from '@/components/layouts/mod-classic'
import Card from '@/components/ui/cards/card'
import { TicketFormValues } from '@/types/tickets/ticketType'
import React, { useState, useEffect}  from 'react'
import TicketDataCard, { TicketCardDataType } from '../../layouts/ticketDataCard'
import ReportMenuMain from '@/app/tickets/components/menus/reportMenu';
import _ from 'lodash'
import ABCardDataLayout from '@/components/customs/layouts/ABCardDataLayout'
import { getAuthCredentials } from "@utils/auth-utils";
import { FrontPath } from '@/constants/enums/paths'
import { useTicketIndexStore } from '@/app/tickets/zustandState'
import { useEncryption } from '@/hooks/useEncryption'
import { PARAM_CODE } from '@/types/route/params/enums/paramCode'
import { PaginationType } from '@/types/pagination/paginationType'
import ABPagination from '@/components/customs/pagination/ABPagination'
import { PaginationProps } from '@/components/customs/pagination/ABPagination/pagination'

type Props = {
  data: TicketFormValues[]
  paginationInfo?: PaginationProps,
  pageChange?: (page: number)=>void,
}

type StateType = {
 tabParam? : string | null
}

const TicketCardReportMain = ({ data,paginationInfo, pageChange}: Props) => {
  const { user } = getAuthCredentials();
  const {currentTab} = useTicketIndexStore()
  const [state, setState] = useState<StateType>({tabParam: ''})

  return (
    <>
      <ABCardDataLayout>
        {(data && data.length > 0) && _.orderBy(data, ["created_at"], ["desc"]).map((item: TicketFormValues, index: number) => (
          <ABTransition order={index ? index + 1 : 0}>
            <TicketDataCard data={{
              ...item,
              firstName: _.get(item, "requestedBy.firstName"),
              lastName: _.get(item, "requestedBy.lastName"),
              serviceDepartment: _.get(item, "serviceDepartment.name"),
              requestingDepartment: _.get(item, "requestingDepartment.name")
            } as TicketCardDataType}
              updatePath={
                [_.get(item, "serviceDepartment._id")].includes(_.get(user, "departmentOnDuty._id")) || 
                [_.get(item, "requestedBy._id")].includes(_.get(user, "_id"))
                ? `${FrontPath.TICKET_UPDATE}/${item?._id}` : null}
              viewPath={`${FrontPath.TICKET_VIEW}/${item?._id}` }
            />
          </ABTransition>
        ))}
      </ABCardDataLayout>
      <ABPagination pageInfo={paginationInfo as PaginationProps} pageChange={pageChange}/>
    </>
  )
}

export default TicketCardReportMain