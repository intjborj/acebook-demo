// Dependencies
import _ from 'lodash';
import moment from 'moment';
import React from 'react'
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
// Hooks
import { PostContextRd } from '@/reducers/posts/postContextRd';
import { getAuthCredentials } from "@utils/auth-utils";
// Constants
import { ARCHIVE_WORK } from '@graphql/operations/tickets/ticketMutation';
import { ticketStatusIdentifier } from '@/constants/options';
import { FrontPath } from '@/constants/enums/paths';
// Custom Components
import Card from '@/components/common/card';
import ArchivePackIcon from '@/components/customs/iconPackage/archivePack-icon';
import EditPackIcon from '@/components/customs/iconPackage/editPack-icon';
import CodeLabel from '@/components/customs/labels/codeLabel';
import PostTagIcon from '@/components/tags/tagIcon';
import { ContainerBgColor } from '@/constants/enums/themes';
import { ArrowUturnLeftIcon } from '@heroicons/react/20/solid';
import ArrowUturnLeftPackIcon from '@/components/customs/iconPackage/arrowUturnLeftPack-icon';

import ABModal from '@/components/customs/modals/ABModal';
import TextArea from '@/components/ui/forms/text-area';
import ABButton from '@/components/ui/buttons/ABbutton';
import BorderDashed from '@/components/ui/border';
import ABArchiveTag from '@/components/customs/labels/ArchiveTag';

type Props = {
    workData?: any;
    ticketData?: any;
}
type FormType = {
    archiveRemarks: string
}

const WorkListItem = ({ workData, ticketData }: Props) => {
    const [archive] = useMutation(ARCHIVE_WORK);
    const [statePostRd, dispatchPostRd] = React.useContext<any>(PostContextRd)
    const { user } = getAuthCredentials();
    const router = useRouter();

    const hookFormProp = useForm<FormType>({
        //@ts-ignore
        // defaultValues: postDefault ?? defaultVals,
        // resolver: yupResolver(ticketRemarksValidationSchema),
    });

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        watch,
        reset,
        setValue,
        getValues
    } = hookFormProp;


    const clickedLink = (event: any, route: string) => {
        event.stopPropagation();
        router.push(route)
    }

    const archiveWork = (data: FormType, value: any) => {
        if (confirm("Are you sure you want to change archive status?")) {

            let payload = {
                _id: workData._id,
            }

            if (value) {
                payload = { ...payload, ...value }
            }

            archive({
                variables: {
                    input: payload,
                },
            })
                .then((resp) => {
                    toast.success('Work Successfully Archived');
                    dispatchPostRd({ type: "refetch", modalData: true })
                })
                .catch((error) => {

                    toast.error('Work failed to save');
                });
        }
    }



    return (
        <div className='pt-2 cursor-pointer'
            onClick={() => { router.push(`${FrontPath.TICKET_WORK_VIEW}/${workData?._id}?mn=${ticketData?._id}`) }}
        >
            <Card className='md:p-3'>
                <div className='grid grid-cols-1 text-slate-500'>
                    <div className='grid grid-cols-2'>
                        <div className='text-xs w-52'>
                            <div className='mb-2 grid grid-cols-1 md:grid-cols-2'>
                                <div><CodeLabel code={workData?.code} className={'text-sm'} /></div>
                                {workData?.isArchived && <ABArchiveTag />}
                            </div>
                            <div>
                                <span className='font-bold text-slate-600' >Date Started :</span><span>  {moment(workData?.dateTimeStarted).format("ll LT")} </span>
                            </div>
                            <div>
                                <span className='font-bold text-slate-600' >Date Finished :</span><span> {moment(workData?.dateTimeFinished).format("ll LT")} </span>
                            </div>
                            {_.get(workData, "workStatus") && <div className='pt-2'>
                                <PostTagIcon name={(_.get(workData, "workStatus") ? ticketStatusIdentifier(_.get(workData, "workStatus"), 'name') : '') as string} bgClass={(_.get(workData, "workStatus") ? ticketStatusIdentifier(_.get(workData, "workStatus"), 'class') : '') as string} />
                            </div>}
                        </div>

                        <div className='flex justify-end gap-2'>
                            {
                                [_.get(ticketData, "serviceDepartment._id")].includes(_.get(user, "departmentOnDuty._id")) &&
                                <>
                                    {/* {workData?.isArchived ? <div onClickCapture={(event: any) => { archiveWork(event, { isArchived: false }) }}><ArrowUturnLeftPackIcon /></div> :
                                        <div>
                                            <ABModal button={
                                                <div onClick={(event: any) => { event.stopPropagation(); }}>
                                                    <ArchivePackIcon />
                                                 </div>
                                            }>
                                                <form onSubmit={handleSubmit((data: FormType) => archiveWork(data, {
                                                    isArchived: true,
                                                    archiveRemarks: data.archiveRemarks
                                                }))}>
                                                    <TextArea
                                                        label={'Remarks *'}
                                                        {...register('archiveRemarks')}
                                                        error={errors.archiveRemarks?.message!}
                                                        variant="outline"
                                                        inputClassName='rounded-md'
                                                        className="mb-5"
                                                    />
                                                    <div className=' flex justify-end pb-3'>
                                                        <ABButton type='submit'>Save</ABButton>
                                                    </div>
                                                    <BorderDashed />
                                                </form>
                                            </ABModal>
                                        </div>
                                    } */}
                                    <div onClick={(event: any) => { clickedLink(event, `${FrontPath.TICKET_WORK_UPDATE}/${workData?._id}`) }}>  <EditPackIcon /></div>
                                </>
                            }

                        </div>
                    </div>
                    <span className='pt-3 font-bold text-sm text-slate-700'>Findings</span>
                    <span className={`${ContainerBgColor.PRIMARY} rounded p-1 mt-1 px-3`}>{workData?.findings}</span>
                </div>
            </Card>
        </div>
    )
}

export default WorkListItem