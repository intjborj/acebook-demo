// Dependencies
import _ from 'lodash';
import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import moment from 'moment';
import { TicketDataType, TicketTypeForm } from '@/types/tickets/ticketType';
// Constants
import { getAuthCredentials } from "@utils/auth-utils";
import { APPROVE_TICKET } from '@graphql/operations/tickets/ticketMutation';
import { PostContextRd } from '@/reducers/posts/postContextRd';
// Customs Components
import ViewContainer from '@/components/layouts/custom-content-view-layout';
import ABTransition from '@/components/customs/transitions/ABTransition';
import { WarningIcon } from '@/components/icons/warning-icon-fill';
// Local Components
import WorkView from '../works/ticketView';
import TicketDetails from './ticketDetails';
import AssignedPersonnel from '../components/assignedPersonel';
import TicketAssignatories from '../components/assignatories';
import TicketMarks from './marks';
import TicketHead from './ticketHead';
import ABAttachmentDisplaySection from '@/components/customs/data/ABAttachmentDisplaySection';
import { ConsoleView } from 'react-device-detect';
import { TicketUploadPath } from '@/constants/uploadPaths';
import Card from '@/components/ui/cards/card';
import ABCardDataLayout from '@/components/customs/layouts/ABCardDataLayout';
import TicketClientFeedback from '../components/clientFeedback/ticket.tsx';


type Props = {
    data?: TicketDataType,
    ticketTypeData?: TicketTypeForm
}

type StateType = {
    isApprover?: boolean;
    approvedAll?: boolean;
    hasReceived?: boolean;
    hasWorks?: boolean;
    hasCompletedAllWorks?: boolean;
    allApprovers?: any;
    pending?: any;
}


const ViewTicketApp = ({ data, ticketTypeData }: Props) => {
    const { user } = getAuthCredentials();
    const [approveTicket] = useMutation(APPROVE_TICKET);
    const [statePostRd, dispatchPostRd] = React.useContext<any>(PostContextRd)
    const [state, setState] = useState<StateType>({
        isApprover: false,
        pending: true,
        hasWorks: true,
        hasCompletedAllWorks: false,
    })

    useEffect(() => {
        if (data) {


            let result: any = []
            let resultApproved: any = []
            let hasReceivedDate: any = []
            let hasCompletedAllWorks: any = []

            result = data?.approvers && data?.approvers.filter((item: any) => {
                return item?.user?._id === user?._id
            })

            resultApproved = data?.approvers && data?.approvers.filter((item: any) => {
                return item?.status === "approved"
            })

            hasReceivedDate = data.assignedPersonnel && data.assignedPersonnel.filter((item: any) => {
                return item?.receivedAt !== null
            })

            hasCompletedAllWorks = data.works && data.works.filter((item: any) => {
                return item?.workStatus === "completed" && (item.isArchived === null || item.isArchived === false)
            })


            setState((p) => ({
                ...p, isApprover: (result?.length >= 1) ? true : false,
                pending: (result?.length >= 1 && result[0]?.status == "pending") ? true : false,
                approvedAll: data.approvers && resultApproved?.length == data.approvers.length ? true : false,
                hasReceived: hasReceivedDate?.length > 0 ? true : false,
                hasWorks: data.works && data.works.length > 0 ? true : false,
                hasCompletedAllWorks: hasCompletedAllWorks && hasCompletedAllWorks.length === data.works.length ? true : false
            }))
        }
    }, [data])

    const approvingProcess = (action: any) => {

        let appLen = data?.approvers ? data?.approvers.length : 0

        let pyApprovers = data?.approvers && data?.approvers.map((item: any) => {
            let clItem = _.cloneDeep(item)
            if (item?.user?._id === user?._id) {
                clItem.status = action
                clItem.updatedAt = moment().format()

            }
            clItem.user = item?.user?._id
            delete clItem.__typename
            return clItem
        })

        let appDisappd = pyApprovers && pyApprovers.filter((item: any) => {
            return item.status == "disapproved"
        })

        let appApproved = pyApprovers && pyApprovers.filter((item: any) => {
            return item.status == "approved"
        })

        let payload = {
            _id: data?._id,
            approvers: pyApprovers,
            status: appDisappd && appDisappd.length === appLen ? "disapproved" : (appApproved && appApproved.length === appLen ? "approved" : "pending")
        }

        approveTicket({
            variables: {
                input: payload,
            },
        })
            .then((resp) => {
                toast.success('Ticket successfully assessed');
                dispatchPostRd({ type: "refetch", modalData: true })
            })
            .catch((error) => {
                toast.error('Ticket failed to assess');
            });

    }


    const approvingAction = (action: string) => {

        if (action == "edit") {
            setState((p) => ({ ...p, pending: true }))
        } else {
            if (confirm("Are you sure to take action in this ticket?")) {
                approvingProcess(action)
            }
        }

    }

    return (
        <div className='grid grid-cols-1 place-items-center  pt-3 mb-10'>

            {/* TICKET DETAILS */}
            <ViewContainer>
                <TicketHead ticketData={data} />
            </ViewContainer>
            <ViewContainer>
                <TicketDetails
                    ticketData={data}
                    isApprover={state.isApprover}
                    pending={state.pending}
                    approvingAction={approvingAction} />
            </ViewContainer>
            {/* Attachments */}
            {(data?.attachments && data?.attachments?.length > 0) && <ABTransition order={2}>
                <div className='w-full pt-3'>
                    <ABCardDataLayout>
                        <Card>
                            <ABAttachmentDisplaySection attachments={data?.attachments} initialPath={TicketUploadPath({ code: data?.code as string })} />
                        </Card>
                    </ABCardDataLayout>
                </div>
            </ABTransition>}

            <ABTransition order={3}>
                <ViewContainer>
                    <>

                        {(data?.approvers && data?.approvers.length > 0) ?
                            <TicketAssignatories
                                ticketData={data}
                                isApprover={state.isApprover}
                                pending={state.pending}
                                approvingAction={approvingAction}
                                hasWorks={state.hasWorks} /> :
                            <div className='border-solid p-2 border-2 rounded text-zinc-400 flex'>
                                <div className='w-5 grid content-center'><WarningIcon /></div>   <div className='pl-2 text-sm'>  No signatories</div>
                            </div>
                        }
                    </>
                </ViewContainer>
            </ABTransition>

            {/* ASSIGNED PERSONNEL */}
            <ABTransition order={4}>
                {/* {
                    data?.assignedPersonnel && data.assignedPersonnel.length > 0 ? */}
                <ViewContainer>
                    <AssignedPersonnel
                        ticketData={data}
                        ticketId={data?._id}
                        isApproved={state.approvedAll}
                        assignedPersonnel={data?.assignedPersonnel} />
                </ViewContainer>
                {/* : <></> */}
                {/* } */}
            </ABTransition>
            {/* WORK DETAILS */}
            <ABTransition order={5}>
                {
                    (
                        (state.hasReceived && !['draft', 'pending', 'disapproved'].includes(data?.status ?? ''))
                        || ticketTypeData?.addWorkWOApprovers == true
                        // || ticketTypeData?.addWorkWOAssignedP == true 
                        || (ticketTypeData?.addWorkWOAssignedP == true && !['draft', 'disapproved'].includes(data?.status ?? ''))
                        // || (ticketTypeData?.addWorkWOAssignedP == true && !['draft', 'pending', 'disapproved'].includes(data?.status ?? ''))
                    )
                        ?
                        <ViewContainer>
                            <WorkView ticketData={data} works={data?.works} />
                        </ViewContainer>
                        : <></>
                }
            </ABTransition>

            {
                [_.get(data, "serviceDepartment._id")].includes(_.get(user, "departmentOnDuty._id")) &&

                <ABTransition order={6}>
                    <ViewContainer>
                        <TicketMarks ticketId={data?._id}
                            hasReceived={state.hasReceived}
                            hasWorks={state.hasWorks}
                            hasCompletedAllWorks={state.hasCompletedAllWorks}
                            ticketTypeData={ticketTypeData}
                            ticketData={data}
                        />
                    </ViewContainer>
                </ABTransition>
            }

            {['success', 'closed', 'failed'].includes(data?.status ?? '') ?
                <ABTransition order={7}>
                    <ViewContainer>
                        <TicketClientFeedback ticketData={data} />
                    </ViewContainer>
                </ABTransition>
                : <></>
            }
        </div>
    )
}

export default ViewTicketApp