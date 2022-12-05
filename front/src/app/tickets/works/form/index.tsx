// Dependencies
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import _, { isEmpty } from 'lodash';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
// Constants
import { PropForm } from '@/types/forms/propHookForm';
import { UPSERT_WORKDETAIL } from '@graphql/operations/tickets/ticketMutation';
import { FrontPath } from '@/constants/enums/paths';
// Custom Components
import ActionWorkDesc from './actionWorkDesc';
import { WorkFormValues } from '@/types/workDetails/workTypes';
import ABButton, { ButtonCategory } from '@/components/ui/buttons/ABbutton';
import TimeDetails from './timeDetails';
import Link from '@/components/ui/link';
import WorkAuthorities from './workAuthorities';
import ABFormAttachment from '@/components/customs/forms/ABFormAttachment';
// Hooks
import { uploadRenaming } from '@/services/uploadRenaming';
import { uploadPack } from '@/services/uploadPack';
import { restructSubmDept } from '../../services/submissionDept-services';
import { TicketWorksUploadPath } from '@/constants/uploadPaths';
import AssetVariationWorkForm from './assetVariation';
import { ConsoleView } from 'react-device-detect';

type Props = {
    ticketId?: string;
    workId?: string;
    defaultVals?: WorkFormValues;
    isAdd?: boolean;
}

type UploadProcType = {
    newImages: string;
    data: any;
    codePaths: string;
}
type StateType = {
    workId?: string | null
}

const WorkFormApp = ({ ticketId, defaultVals, workId, isAdd }: Props) => {
    const router = useRouter();
    const [state, setState] = useState<StateType>({
        workId: null
    })

    const hookFormProp = useForm<WorkFormValues>({
        //@ts-ignore
        defaultValues: defaultVals ?? {},
        // resolver: yupResolver(ticketValidationSchema),
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
    } = hookFormProp

    const [upsertDet] = useMutation(UPSERT_WORKDETAIL);

    const uploadProcess = async ({ newImages, data, codePaths }: UploadProcType) => {

        let newUpsFn = await uploadPack({
            attachments: newImages,
            type: 'tickets',
            initialFilename: `tckwrk_${data.workCode ?? 'new'}`,
            codePaths: codePaths
        })
    }

    const processSubmission = async (values: WorkFormValues, type: string) => {
       

        let assetVars = []
        if(!isEmpty(values.assetVariation)){
            assetVars= _.map(values.assetVariation, "_id")
        }

     


        const { forSubmissionData, forRefetchFiles, renamedFiles } = await uploadRenaming({
            attachments: values.attachments_image,
            filenameCode: values.workCode,
            transactionType: "ticketworks",
            transactionCode: "tcktwrks",
            fileType: 'image'
        }
        )

        let performedBy = []
        if(values.performedBy && values.performedBy.length > 0){
            performedBy = _.map(values.performedBy, "_id")
        }

        let payload = {
            // descActualWorkDone: data.descActualWorkDone,
            _id: workId ?? null,
            assetVariation: assetVars,
            findings: values.findings,
            dateTimeStarted: values.dateTimeStarted,
            dateTimeFinished: values.dateTimeFinished,
            descActualWorkDone: values.descActualWorkDone,
            ticketId: ticketId,
            workStatus: type,
            attachments: forSubmissionData,
            submissionDepartment: restructSubmDept(values.submissionDepartment),
            performedBy: performedBy,
            workCategory: values.workCategory ? _.get(values.workCategory, "value") : null
        }

      

        upsertDet({
            variables: {
                input: payload,
            },
        })
            .then((resp) => {


                if (renamedFiles.length > 0) {

                    uploadProcess({
                        newImages: renamedFiles,
                        data: values,
                        codePaths: TicketWorksUploadPath({ ticketCode: _.get(resp, "data.upsertWorkDetail.ticket.code"), workCode: _.get(resp, "data.upsertWorkDetail.code") }),
                        // codePaths: `${_.get(resp, "data.upsertWorkDetail.ticket.code")}/${_.get(resp, "data.upsertWorkDetail.code")}`,
                    })

                    setValue("attachments_image", forRefetchFiles)

                }
                setState((p) => ({ ...p, workId: _.get(resp, "data.upsertWorkDetail._id") }))
                toast.success('Work successfully saved');
                // if (!workId) { reset() }
                router.push(`${FrontPath.TICKET_WORK_UPDATE}/${_.get(resp, "data.upsertWorkDetail._id")}`)
            })
            .catch((error) => {

                toast.error('Work failed to save');
            });


    }

    const onSubmit = async (data: WorkFormValues, type: string) => {
        if (confirm("Are you sure you want to create work for this ticket?")) {
           
            processSubmission(data, type)
        }

    }

    return (
        <div className='pb-20'>
            <form >
                {(state.workId || workId) && <div className='p-1 flex justify-end'> <Link href={`/tickets/works/view/${state.workId ?? workId}?mn=${ticketId}`}>  <ABButton>  View</ABButton></Link></div>}

                <TimeDetails hookFormProp={hookFormProp as PropForm} />
                <ActionWorkDesc hookFormProp={hookFormProp as PropForm} />
                <ABFormAttachment hookFormProp={hookFormProp as PropForm} />
                <AssetVariationWorkForm ticketId={ticketId} hookFormProp={hookFormProp as PropForm}/>
                <WorkAuthorities hookFormProp={hookFormProp as PropForm} />

                <div className='flex justify-end text-end'>
                    <div className=" mb-4 flex gap-1">
                        <div><Link href={isAdd ? `${FrontPath.TICKET_VIEW}/${ticketId}` : `${FrontPath.TICKET_WORK_VIEW}/${state.workId ?? workId}?mn=${ticketId}`}> <ABButton category={ButtonCategory.NORMAL}  >Cancel</ABButton></Link></div>
                        <div><ABButton category={ButtonCategory.SECONDARY} onClick={handleSubmit(e => onSubmit(e, "draft"))}  >Save Draft</ABButton></div>
                        <div><ABButton onClick={handleSubmit(e => onSubmit(e, "completed"))} >Mark Completed</ABButton></div>
                    </div>
                </div>

            </form>
        </div>
    )
}

export default WorkFormApp