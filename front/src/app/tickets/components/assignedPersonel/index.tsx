import React, { useState, useEffect } from 'react'
import Card from '@/components/common/card';
import ReactTimeAgo from 'react-time-ago';
import ABButton from '@/components/ui/buttons/ABbutton';
import { getAuthCredentials } from "@utils/auth-utils";
import { useMutation } from '@apollo/client';
import { UPSERT_TICKET, APPROVE_TICKET, RECEIVE_TASK } from '@graphql/operations/tickets/ticketMutation';
import { toast } from 'react-toastify';
import { PostContextRd, PostContextType } from '@/reducers/posts/postContextRd';
import _, { isEmpty } from 'lodash';
import ABModal from '@/components/customs/modals/ABModal';
import EditPackIcon from '@/components/customs/iconPackage/editPack-icon';
import AssignedPersonnelForm from './assignedPersonnelForm';
import BorderDashed from '@/components/ui/border';
import ABDisplaySectionLabel from '@/components/customs/layouts/ABDisplaySectionLabel';
import ToDo from '../toDo';
import TicketEmptyPersonnel from '../svg/emptyPersonnel';

type Props = {
    assignedPersonnel?: any;
    isApproved?: boolean;
    ticketId?: string;
    ticketData?: any;
}

type StateType = {
    hasReceived?: boolean;
    signatoriesIds?: string[];
    assignedIds?: string[];
    defaultAssigs?: Object | null;
}

const AssignedPersonnel = ({ assignedPersonnel: data, isApproved, ticketId, ticketData }: Props) => {
    const { user } = getAuthCredentials();

    const [receiveTask] = useMutation(RECEIVE_TASK);
    const [state, setState] = useState<StateType>({
        hasReceived: true,
        defaultAssigs: null,
        assignedIds: [],
        signatoriesIds: []
    })
    const [statePostRd, dispatchPostRd] = React.useContext<any>(PostContextRd)


    useEffect(() => {
        if (data) {
            let check = data.filter((item: any) => {
                return item?.user?._id === user?._id
            })

            if (check.length > 0) {
                if (check[0].receivedAt) {
                    setState((p) => ({ ...p, hasReceived: true }))
                } else {
                    setState((p) => ({ ...p, hasReceived: false }))
                }
            }


            // Extract default
            // let getUser = _.map(data, "user")
            let getUser = data.map((item: any) => {
                return {
                    ...item.user,
                    receivedAt: item.receivedAt
                }
            })

            let assignedIds = _.map(getUser, "_id")
            let signatoriesIds = _.map(_.get(ticketData, "approvers"), "user._id")

            setState((p) => ({
                ...p, defaultAssigs: { assignedPersonnel: getUser },
                assignedIds: assignedIds,
                signatoriesIds: signatoriesIds
            }))
        }
    }, [data])


    const handleOnReceive = () => {
        if (confirm("Are you sure you want to receive this task?")) {
            receiveTask({
                variables: {
                    id: ticketId,
                    userId: user?._id
                },
            })
                .then((resp) => {

                    toast.success('Task successfully received');
                    dispatchPostRd({ type: "refetch", modalData: true })
                })
                .catch((error) => {
                    toast.error('Task failed to receive');
                });
        }
    }


    return (
        <div>
            <Card>
                {/* To Do Module */}
                {(
                    [_.get(ticketData, "serviceDepartment._id")].includes(_.get(user, "departmentOnDuty._id")) ||
                    (state.assignedIds && state.assignedIds.includes(_.get(user, "_id") as string)) ||
                    (state.signatoriesIds && state.signatoriesIds.includes(_.get(user, "_id") as string))
                ) && <ToDo toDoList={_.get(ticketData, "toDo")} />}

                <div className='grid grid-cols-2'>
                    <ABDisplaySectionLabel>Assigned Personnel</ABDisplaySectionLabel>
                    {/* <h1 className="mb-4 text-md font-extrabold text-gray-900 dark:text-white md:text-md ">Assigned Personnel</h1> */}
                    <div className='flex justify-end relative pr-1'>

                        {
                            [_.get(ticketData, "serviceDepartment._id")].includes(_.get(user, "departmentOnDuty._id")) &&
                            <ABModal button={<EditPackIcon />}>

                                <div className=' p-2'>
                                    <div className='mb-5'>
                                        {
                                            state.defaultAssigs &&
                                            <AssignedPersonnelForm defaults={state.defaultAssigs} ticketId={ticketId} />
                                        }
                                    </div>
                                </div>
                                <BorderDashed />
                            </ABModal>
                        }
                        {/* <div className='absolute right-5 top-0'><ABTooltip /></div> */}
                    </div>
                </div>
                <div className='grid   md:grid-flow-col md:auto-cols-max  gap-2'>

                    {
                        (data ) ?
                            <>
                                {data.map((item: any) => (
                                    <>
                                        <div className='w-fit capitalize bg-sky-300  p-1 px-3  rounded text-sky-900 grid grid-cols-1'>
                                            <span className='text-[.60rem] text-sky-700 font-bold'>
                                                {item.receivedAt &&
                                                    <>Received  <ReactTimeAgo date={item.receivedAt} locale="en-US" /></>}
                                            </span>
                                            <div className='flex '>
                                                <span className='text-sm font-bold'>{item.user.firstName} {item.user.lastName} </span>
                                                <div className='grid content-center'><span className='font-bold  scale-75 '> [{_.get(item, "user.departmentOnDuty.name")}]</span></div>
                                            </div>
                                            {/* <span className='font-bold italic text-[.70rem]'> {_.get(item, "user.departmentOnDuty.name")}</span> */}
                                        </div>
                                    </>
                                ))}
                            </>
                            : <></>
                    }
                </div>
                {
                  (isEmpty(data) && data?.length == 0) ? <div ><TicketEmptyPersonnel /></div> : <></>
                }
                {(state.hasReceived == false && isApproved) &&
                    <div className='pt-3'>
                        <ABButton onClick={() => handleOnReceive()}>Receive Task</ABButton>
                    </div>
                }
                {/* <ABButton onClick={() => action("edit")}>Edit Approval</ABButton> */}
            </Card>
        </div>
    )
}

export default AssignedPersonnel