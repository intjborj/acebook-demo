import ABCardDataLayout from '@/components/customs/layouts/ABCardDataLayout'
import ABTransition from '@/components/customs/transitions/ABTransition'
import { FrontPath } from '@/constants/enums/paths'
import { WorkFormValues } from '@/types/workDetails/workTypes'
import _ from 'lodash'
import React from 'react'
import TicketDataCard, { TicketCardDataType } from '../../layouts/ticketDataCard'

type Props = {
    data?: WorkFormValues[]
}

const WorkCardReportMain = ({ data }: Props) => {
   
    return (
        <div>
            <ABCardDataLayout>
                {(data && data.length > 0) && _.orderBy(data, ["created_at"], ["desc"]).map((item: WorkFormValues, index: number) => (
                    <ABTransition order={index ? index + 1 : 0}>
                        <TicketDataCard data={{
                            _id: item?._id,
                            code: item?.code,
                            status: item?.workStatus,
                            created_at: item?.created_at,
                            firstName: _.get(item, "ticket.requestedBy.firstName"),
                            lastName: _.get(item, "ticket.requestedBy.lastName"),
                            serviceDepartment: _.get(item, "ticket.serviceDepartment.name"),
                            requestingDepartment: _.get(item, "ticket.requestingDepartment.name"),
                            subject: _.get(item, "ticket.subject"),
                            type: _.get(item, "ticket.type"),
                            typeId: _.get(item, "ticket.typeId"),
                            dateRequested: _.get(item, "ticket.dateRequested")
                        } as TicketCardDataType}
                        viewPath={`${FrontPath.TICKET_WORK_VIEW}/${item._id}?mn=${_.get(item, "ticket._id")}`}
                        />
                    </ABTransition>
                ))}
            </ABCardDataLayout>
        </div>
    )
}

export default WorkCardReportMain