import EditPackIcon from '@/components/customs/iconPackage/editPack-icon';
import ABModal from '@/components/customs/modals/ABModal';
import { WorkFormValues } from '@/types/workDetails/workTypes';
import React, { useState, useEffect, useContext } from 'react'
import _, { isEmpty } from 'lodash';
import WorkSectionHeader from '@/app/tickets/works/view/components/layouts/sectionHeader';
import SubDeptForm from './subDeptForm';
import BorderDashed from '@/components/ui/border';
import { WorkViewContext } from '@/app/tickets/works/view';
import { getAuthCredentials } from "@utils/auth-utils";
import ABButton from '@/components/ui/buttons/ABbutton';
import { useQuery, useMutation } from '@apollo/client';
import { UPSERT_SUBMISSIONDEPT } from '@graphql/operations/tickets/ticketMutation';
import { PostContextRd, PostContextType } from '@/reducers/posts/postContextRd';
import { toast } from 'react-toastify';
import moment from 'moment';
import ReactTimeAgo from 'react-time-ago';
import ABDisplaySectionLabel from '@/components/customs/layouts/ABDisplaySectionLabel';
import TicketEmptyDept from '../svg/emptyDept';

type Props = {
    ticketData?: any;
    workData?: WorkFormValues;
}
type StateType = {
    defaultSubDept?: Object | null;
    hasReceived?: boolean;
    isReceivingDept?: boolean;
}



const SubmissionDepartmentDetails = ({ }: Props) => {
    const { workData, ticketData } = useContext(WorkViewContext) || {};
    const { user } = getAuthCredentials();

    const [state, setState] = useState<StateType>({
        defaultSubDept: null,
        hasReceived: false
    })
    const [upsertSubDep] = useMutation(UPSERT_SUBMISSIONDEPT);
    const [statePostRd, dispatchPostRd] = React.useContext<any>(PostContextRd)

    useEffect(() => {
        if (workData) {
            let recon = _.get(workData, "submissionDepartment").map((item: any) => {
                return {
                    ...item.department,
                    status: item.status,
                    updatedAt: item.updatedAt
                }
            })

            let hasRec = _.get(workData, "submissionDepartment").filter((item: any) => {
                return item?.department?._id === _.get(user, "departmentOnDuty._id")
            })

           

            setState((p) => ({ ...p, defaultSubDept: { submissionDepartment: recon }, hasReceived: hasRec[0]?.status === "received" ? true : false, isReceivingDept: hasRec.length > 0 ? true : false }))
        }
    }, [workData])

    const processChange = (subDept: any) => {
        upsertSubDep({
            variables: {
                input: {
                    _id: workData?._id,
                    submissionDepartment: subDept
                }
            },
        })
            .then((resp) => {
                dispatchPostRd({ type: "refetch", modalData: true })
                toast.success("Work received")

            })
            .catch((error) => {
                toast.error("Work failed to received")

            });
    }

    const handleOnReceive = () => {
        if (confirm("Are you sure you want to receive this work?")) {

            let payload = _.get(workData, "submissionDepartment").map((item: any) => {
                let rec: { department: string; status?: string | null; updatedAt?: string | null } = {
                    department: item?.department?._id,
                    status: null,
                    updatedAt: null
                }

                if (item?.department?._id === _.get(user, "departmentOnDuty._id")) {
                    rec.status = "received",
                        rec.updatedAt = moment().format()
                }


                return rec
            })


            processChange(payload)


        }
    }



    return (
        <div className='w-full'>
            <div className='grid grid-cols-2'>
                <div className='w-52'> <ABDisplaySectionLabel>Receiving Department</ABDisplaySectionLabel></div>
                {/* <div className='w-52'> <WorkSectionHeader>Submission Department</WorkSectionHeader></div> */}
                <div className='flex justify-end relative'>
                    {
                        [_.get(ticketData, "serviceDepartment._id")].includes(_.get(user, "departmentOnDuty._id")) &&
                        <ABModal button={<EditPackIcon />}>

                            <div className='p-2'>
                                <div className='mb-5 z-50'>
                                    {state.defaultSubDept && <SubDeptForm workId={workData?._id} defaults={state.defaultSubDept} />}
                                </div>
                                <BorderDashed />
                            </div>
                        </ABModal>
                    }
                    {/* <div className='absolute right-5 top-0'><ABTooltip /></div> */}
                </div>
                {/* GUBA ANG TOOLTIP */}
            </div>
            <div className='grid   md:grid-flow-col md:auto-cols-max  gap-2'>
                {
                    workData?.submissionDepartment && workData?.submissionDepartment.map((item: any) => (
                        <div className='w-fit capitalize bg-sky-300  p-1 px-3  rounded text-sky-900 grid grid-cols-1'>
                            <span className='text-[.60rem] text-sky-700 font-bold'>
                                {item.updatedAt &&
                                    <>Received  <ReactTimeAgo date={item?.updatedAt} locale="en-US" /></>}
                            </span>
                            {item?.department?.name}
                        </div>
                    ))
                }
            </div>
            <div>
                {(isEmpty(workData?.submissionDepartment)  && workData?.submissionDepartment.length == 0 ) && <TicketEmptyDept/>}
            </div>
            <div className='pt-2'>
                {(state.hasReceived === false && state.isReceivingDept === true) && <ABButton onClick={() => handleOnReceive()}>Receive</ABButton>}
            </div>
        </div>
    )
}

export default SubmissionDepartmentDetails