import React,{useEffect} from 'react'
import TicketDescription from './ticketDescription'
import { useForm } from 'react-hook-form';
import { TicketFormValues } from '@/types/tickets/ticketType';
import { yupResolver } from '@hookform/resolvers/yup';
import { ticketValidationSchema } from './formvalidations/ticket-validation-schema';
import BorderDashed from '@/components/ui/border';
import TicketAutorization from './authorization/ticketAuthorization';
import Button from '@admin/components/ui/button';
import { useMutation } from '@apollo/client';
import { UPSERT_TICKET } from '@graphql/operations/tickets/ticketMutation';
import { toast } from 'react-toastify';
import moment from 'moment';
import { getAuthCredentials } from '@/utils/auth-utils';
import { extractObjectId, restructApprover } from '@/services/extractions';
import _ from 'lodash';
import TicketDetails from './ticketDetails';
type Props = {
  postDefault?: any;
}



const TicketForm = ({ postDefault }: Props) => {
  const { user } = getAuthCredentials();

  const defaultVals = {
    dateRequested: moment().format('YYYY-MM-DD'),
    createdBy: user,
    requestedBy: user,
    requestingDepartment: _.get(user, "departmentOnDuty")
  }

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset,
    setValue,
    getValues
  } = useForm<TicketFormValues>({
    //@ts-ignore
    defaultValues: postDefault ?? defaultVals,
    resolver: yupResolver(ticketValidationSchema),
  });


  const [upsertAcc] = useMutation(UPSERT_TICKET);

  const onSubmit = async (values: TicketFormValues, type:string) => {

    values._id = _.get(postDefault, "_id")
    values.createdBy = _.get(values.createdBy, "_id")
    values.requestedBy = _.get(values.requestedBy, "_id")
    values.serviceDepartment = _.get(values.serviceDepartment, "_id")
    values.requestingDepartment = _.get(values.requestingDepartment, "_id")
    values.type = _.get(values.type, "code")
    values.status = type
    values.postOrigin =  _.get(postDefault, "postOrigin") ? _.get(postDefault, "postOrigin") : null
    values.approvers =  restructApprover(values.approvers)

    delete values.__typename
    delete values.approvers_temp
   
    console.log("payload", values)
    if (confirm('Are you sure you want to save ticket?')) {
      upsertAcc({
        variables: {
          input: values,
        },
      })
        .then((resp) => {
        
          toast.success('Ticket successfully saved');
          // reset()
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
        <TicketDescription register={register} errors={errors} control={control} />
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
        <div className="text-end mb-4  ">
          <Button onClick={handleSubmit(e => onSubmit(e,"draft" ))} className='mr-3' loading={false}>Save As Draft</Button>
          <Button onClick={handleSubmit(e => onSubmit(e,"pending" ))} loading={false}>Submit Final</Button>
        </div>
      </form>
    </div>
  )
}

export default TicketForm