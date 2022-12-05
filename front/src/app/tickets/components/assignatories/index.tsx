import React from 'react'
import ViewAssigs from '@/app/tickets/components/assignatories/viewAssigs';
import Approving from '@/app/tickets/view/approving';
import Card from '@/components/common/card';
import _ from 'lodash';
import BorderDashed from '@/components/ui/border';
import { TicketDataType, TicketFormValues } from '@/types/tickets/ticketType';

type Props = {
    ticketData?: TicketDataType;
    isApprover?: boolean;
    pending?: boolean;
    approvingAction?: any;
    hasWorks?: boolean;
}


const TicketAssignatories = ({ ticketData:data, isApprover, pending, approvingAction, hasWorks }: Props) => {
    return (
        <div>
            <Card>
                <ViewAssigs data={data?.approvers}  displayAll={pending} approvingAction={approvingAction}  />

                {isApprover && !['draft'].includes(data?.status as string) && !hasWorks ?
                    <>
                        <div className='pt-4'><BorderDashed /></div>
                        <Approving displayAll={pending} action={approvingAction} />
                    </>
                    : <></>}
            </Card>
        </div>
    )
}

export default TicketAssignatories