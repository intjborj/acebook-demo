import Input from '@admin/components/ui/input';
import Button from '@admin/components/ui/button';
import Card from '@/components/common/card';
import Description from '@admin/components/ui/description';
import { getLayout } from '@/components/layouts/layout';
import { useTranslation } from 'next-i18next';
import TextArea from '@/components/ui/forms/text-area';
import SelectInput from '@admin/components/ui/select-input';
import Label from '@admin/components/ui/label';
import { ticketStatusIdentifier, ticketTypeIdentifier, TICKET_TYPE } from '@/constants/options';
import PostedByDetails from '@/app/posts/components/postedByDetails';
import _ from 'lodash';
import PostTagIcon from '@/components/tags/tagIcon';
import PostTime from '@/app/posts/components/postTime';
import ReactTimeAgo from 'react-time-ago';
import InputLabelCont from '@/components/ui/labels/InputLabel';
import ViewAssigs from './viewAssigs';
import Approving from './approving';
import React, { useState, useEffect } from 'react'
import { getAuthCredentials } from "@utils/auth-utils";
import { useMutation } from '@apollo/client';
import { UPSERT_TICKET } from '@graphql/operations/tickets/ticketMutation';
import { toast } from 'react-toastify';
import { PostContextRd, PostContextType } from '@/reducers/posts/postContextRd';


type Props = {
    data?: any
}

type StateType = {
    isApprover?: boolean;
    allApprovers?: any;
    pending?: any;
}


const ViewTicketApp = ({ data }: Props) => {
    const { user } = getAuthCredentials();
   

    const [state, setState] = useState<StateType>({ isApprover: false, pending: true })
    const [upsertAcc] = useMutation(UPSERT_TICKET);
    const [statePostRd, dispatchPostRd] = React.useContext<any>(PostContextRd)

    useEffect(() => {
        if (data) {
            let result = _.get(data, "tickets.data[0].approvers").filter((item: any) => {
                return item?.user?._id === user?._id
            })


            setState((p) => ({
                ...p, isApprover: (result?.length >= 1) ? true : false,
                pending: (result?.length >= 1 && result[0]?.status == "pending") ? true : false
            }))
            // setState((p) => ({ ...p, isApprover: (result?.length >= 1 &&( result[0]?.status == "pending" && result[0]?.status == "pending")) ? true : false }))
            // setState((p) => ({ ...p, isApprover: (result?.length >= 1 && result[0]?.status == "pending") ? true : false }))
        }
    }, [data])

    const approvingProcess = (action: any) => {

        let appLen = _.get(data, "tickets.data[0].approvers").length

        let pyApprovers = _.get(data, "tickets.data[0].approvers").map((item: any) => {
            let clItem = _.cloneDeep(item)
            if (item?.user?._id === user?._id) {
                clItem.status = action

            }
            clItem.user = item?.user?._id
            delete clItem.__typename
            return clItem
        })

        let appDisappd = pyApprovers.filter((item: any) => {
            return item.status == "disapproved"
        })

        let appApproved = pyApprovers.filter((item: any) => {
            return item.status == "approved"
        })

        let payload = {
            _id: _.get(data, "tickets.data[0]._id"),
            approvers: pyApprovers,
            status: appDisappd.length === appLen ? "disapproved" : (appApproved.length === appLen ? "approved" :"pending" )


        }
        console.log("payload", payload)

        upsertAcc({
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
        <div className='flex justify-center pt-3 mb-10'>
            <Card className="w-full sm:w-8/12 md:w-2/3">
                <div className='flex flex-wrap relative '>
                    <div className='relative md:absolute right-0'>
                        <div className='border-solid border-2 w-max p-2 rounded-lg flex justify-center'>
                            {(_.get(data, "tickets.data[0].type") ? ticketTypeIdentifier(_.get(data, "tickets.data[0].type"), 'name') : '') as string}
                        </div>
                    </div>
                    <div className='pt-3 md:pt-0 w-full'>

                        <div className='relative'>
                            <PostedByDetails firstName={_.get(data, "tickets.data[0].requestedBy.firstName")} lastName={_.get(data, "tickets.data[0].requestedBy.lastName")} department={_.get(data, "tickets.data[0].requestingDepartment.name")} profilePicture={_.get(data, "tickets.data[0].requestedBy.profilePicture")}/>
                            <div className='absolute   top-[2.3rem] left-[3rem]'>
                                <div className='relative flex'>
                                    <div className="text-[12px] text-body">

                                        <ReactTimeAgo date={_.get(data, "tickets.data[0].dateRequested")} locale="en-US" />
                                        {/* <PostTime created_at={_.get(data, "tickets.data[0].dateRequested")} /> */}

                                        <b>  &nbsp; / needed &nbsp;<ReactTimeAgo date={_.get(data, "tickets.data[0].dateNeeded")} locale="en-US" /></b>
                                        {/* <PostTime created_at={_.get(data, "tickets.data[0].dateNeeded")} /> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='pt-4'>
                    <PostTagIcon name={(_.get(data, "tickets.data[0].status") ? ticketStatusIdentifier(_.get(data, "tickets.data[0].status"), 'name') : '') as string} bgClass={(_.get(data, "tickets.data[0].status") ? ticketStatusIdentifier(_.get(data, "tickets.data[0].status"), 'class') : '') as string} />
                </div>
                <div className='pt-3'>
                    <h5 className="text-2xl font-normal leading-normal mt-0  text-stone-800">  {_.get(data, "tickets.data[0].subject")} </h5>
                </div>
                <div className='pt-1 pb-3' >
                    <p className="text-base font-light leading-relaxed mt-0 mb-0 text-zinc-800">
                        {_.get(data, "tickets.data[0].description")}  kk
                    </p>
                </div>

                <div className='pt-10 relative'>
                    <InputLabelCont label='Service Department' value={_.get(data, "tickets.data[0].serviceDepartment.name")} />
                    <InputLabelCont label='Service Location' value={_.get(data, "tickets.data[0].location")} />
                </div>
                <div>
                    <ViewAssigs data={_.get(data, "tickets.data[0].approvers")} />

                </div>

                {state.isApprover ? <Approving displayAll={state.pending} action={approvingAction} /> : <></>}


            </Card>
        </div>
    )
}

export default ViewTicketApp