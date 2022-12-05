// Dependencies
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import moment from 'moment';
import _ from 'lodash';
// Constants
import { TicketFormValues } from '@/types/tickets/ticketType';
import { UPSERT_TICKET } from '@graphql/operations/tickets/ticketMutation';
import { ticketValidationSchema } from './formvalidations/ticket-validation-schema';
import { FrontPath } from '@/constants/enums/paths';
// Hooks
import { getAuthCredentials } from '@/utils/auth-utils';
import { restructApprover } from '@/services/extractions';
import { uploadRenaming } from '@/services/uploadRenaming';
// Custom Components
import Link from '@/components/ui/link';
import ABButton, { ButtonCategory } from '@/components/ui/buttons/ABbutton';
import BorderDashed from '@/components/ui/border';
import TicketDescription from './ticketDescription'
import TicketAutorization from './authorization/ticketAuthorization';
import ABFormAttachment from '@/components/customs/forms/ABFormAttachment';
import { PropForm } from '@/types/forms/propHookForm';
import { uploadPack } from '@/services/uploadPack';
import { TicketUploadPath } from '@/constants/uploadPaths';
import AssetTicketForm from '../components/asset';
import FucntionRestriction from '@/app/restrictions/system/function';


type Props = {
  postDefault?: any;
  isNew?: boolean;
}

type StateType = {
  ticketId?: string | null
}

type UploadProcType = {
  newImages: string;
  data: any;
  code: string;
  codePaths: string;
}

const TicketForm = ({ postDefault, isNew }: Props) => {
  const router = useRouter();
  const { user } = getAuthCredentials();
  const [upsertAcc] = useMutation(UPSERT_TICKET);
  const [state, setState] = useState<StateType>({
    ticketId: null
  })

  const defaultVals = {
    dateRequested: moment().format(),
    // dateRequested: moment().format('YYYY-MM-DD'),
    createdBy: user,
    requestedBy: user,
    requestingDepartment: _.get(user, "departmentOnDuty")
  }



  const hookFormProp = useForm<TicketFormValues>({
    //@ts-ignore
    defaultValues: postDefault ?? defaultVals,
    resolver: yupResolver(ticketValidationSchema),
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

  const uploadProcess = async ({ newImages, data, codePaths, code }: UploadProcType) => {

    let newUpsFn = await uploadPack({
      attachments: newImages,
      type: 'tickets',
      initialFilename: `tck_${code ?? 'new'}`,
      codePaths: codePaths
    })
  }

  const onSubmit = async (values: TicketFormValues, status: string, isOverride: boolean = false) => {

    const { forSubmissionData, forRefetchFiles, renamedFiles } = await uploadRenaming({
      attachments: values.attachments_image,
      filenameCode: values.code,
      transactionType: "tickets",
      transactionCode: "tckts",
      fileType: 'image'
    }
    )


    // let payload = {
    //   _id: state.ticketId ?? _.get(postDefault, "_id"),
    //   createdBy: _.get(values.createdBy, "_id"),
    //   requestedBy: _.get(values.requestedBy, "_id"),
    //   serviceDepartment: _.get(values.serviceDepartment, "_id"),
    //   requestingDepartment: _.get(values.requestingDepartment, "_id"),
    //   type: _.get(values.type, "code"),
    //   typeId: _.get(values.type, "_id"),
    //   status: status,
    //   postOrigin: _.get(postDefault, "postOrigin") ? _.get(postDefault, "postOrigin") : null,
    //   approvers: restructApprover(values.approvers),
    //   dateRequested: values.dateRequested,
    //   dateNeeded: values.dateNeeded,
    //   description: values.description,
    //   location: values.location,
    //   subject: values.subject,
    //   attachments: forSubmissionData,
    //   asset: _.get(values.asset, "_id"),
    //   isOverride: isOverride
    // }



    let payload = {
      _id: state.ticketId ?? _.get(postDefault, "_id"),
      dateRequested: values.dateRequested,
      dateNeeded: values.dateNeeded,
      description: values.description,
      location: values.location,
      subject: values.subject,
      attachments: forSubmissionData,
      asset: _.get(values.asset, "_id"),
      requestedBy: _.get(values.requestedBy, "_id"),
      requestingDepartment: _.get(values.requestingDepartment, "_id"),
      isOverride: isOverride
    }

    if (isOverride == false) {
      payload = {
        ...payload,
        ...
        {
          createdBy: _.get(values.createdBy, "_id"),
          serviceDepartment: _.get(values.serviceDepartment, "_id"),
          type: _.get(values.type, "code"),
          typeId: _.get(values.type, "_id"),
          status: status,
          postOrigin: _.get(postDefault, "postOrigin") ? _.get(postDefault, "postOrigin") : null,
          approvers: restructApprover(values.approvers),
        }
      }
    }



    if (confirm('Are you sure you want to save ticket?')) {
      upsertAcc({
        variables: {
          input: payload,
        },
      })
        .then((resp) => {


          if (_.get(resp, "data.upsertTicket._id")) {
            if (renamedFiles.length > 0) {

              uploadProcess({
                newImages: renamedFiles,
                data: values,
                code: _.get(resp, "data.upsertWorkDetail.code"),
                codePaths: TicketUploadPath({ code: _.get(resp, "data.upsertTicket.code") }),
                // codePaths: `${_.get(resp, "data.upsertTicket.code")}/attachments`,
              })

              setValue("attachments_image", forRefetchFiles)

            }
            setState((p) => ({ ...p, ticketId: _.get(resp, "data.upsertTicket._id") }))

            router.push(`${FrontPath.TICKET_UPDATE}/${_.get(resp, "data.upsertTicket._id")}`)
            toast.success('Ticket successfully saved');
          }
        })
        .catch((error) => {

          toast.error('Ticket failed to save');
        });
    }
  }

  useEffect(() => {
    register("approvers")
    register("approvers_temp")
  }, [postDefault])



  return (
    <div>
      <form >
        {/* <form onSubmit={handleSubmit(onSubmit)}> */}
        {/* <TicketDetails register={register} errors={errors} control={control} /> */}
        {(state.ticketId || _.get(postDefault, "_id")) && <div className='p-1 flex justify-end'> <Link href={`/tickets/view/${state.ticketId ?? _.get(postDefault, "_id")}`}>  <ABButton>  View</ABButton></Link></div>}
        <TicketDescription register={register} errors={errors} control={control} watch={watch} />
        <BorderDashed />
        <AssetTicketForm hookFormProp={hookFormProp as PropForm} />
        <BorderDashed />
        <ABFormAttachment hookFormProp={hookFormProp as PropForm} />
        <BorderDashed />
        <TicketAutorization
          register={register}
          errors={errors}
          control={control}
          createdByOpt={[user]}
          watch={watch}
          setValue={setValue}
          getValues={getValues}
          update={_.get(postDefault, "_id") ? true : false}
        />
        {(isNew || postDefault.status == 'draft' || postDefault.status == 'disapproved') &&
          <div className='flex justify-end'>
            <div className="text-end mb-4 grid grid-cols-2 w-fit gap-1">
              <div className='flex justify-end w-fit'> <ABButton category={ButtonCategory.SECONDARY} onClick={handleSubmit(e => onSubmit(e, "draft", false))}>Save as Draft</ABButton></div>
              <div className='w-fit'> <ABButton category={ButtonCategory.PRIMARY} onClick={handleSubmit(e => onSubmit(e, "pending", false))}>Submit Final</ABButton></div>
            </div>
          </div>
        }

        {(!isNew && !['draft', 'disapproved'].includes(postDefault.status)) &&
          <div className='flex justify-end pb-10'>
            <FucntionRestriction code="OVERRIDE_TICKET_DETAILS">
              <ABButton category={ButtonCategory.PRIMARY} onClick={handleSubmit(e => onSubmit(e, postDefault.status, true))}>Override Details</ABButton>
            </FucntionRestriction>
          </div>
        }

      </form>
    </div>
  )
}

export default TicketForm