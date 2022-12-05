import { TicketTypeForm } from '@/types/tickets/ticketType';
import React, { useState, useEffect } from 'react'
import TicketApprovers from './assignatories'
import { useForm } from 'react-hook-form';
import Card from '@/components/common/card';
import TicketTypeDetails from './details';
import CardRight from '@/components/ui/cards/cardRight';
import { ticketTypeIdentifier } from '@/constants/options';
import Button from '@admin/components/ui/button';
import { extractObjectId } from '@/services/extractions';
import { useMutation, useQuery } from '@apollo/client';
import { UPSERT_TICKET_TYPE } from '@graphql/operations/tickets/ticketMutation';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { GET_TICKET_TYPE_SPEC } from '@graphql/operations/tickets/ticketQueries';

type Props = {
  code?: string;
  defaults?: string;
}
type StateType = {
  name?: string;
}

const TicketTypeFormComp = ({ code, defaults }: Props) => {
  const [state, setState] = useState({ name: '' })

 

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset
  } = useForm<TicketTypeForm>({
    //@ts-ignore
    defaultValues: defaults?? {},

    // resolver: ,
  });

  const [upsertCol] = useMutation(UPSERT_TICKET_TYPE);

  


  const onSubmit = async (values: TicketTypeForm) => {
   
    // values.code = code
    values.approvers = extractObjectId(values.approvers)
    // console.log("values", values)

    if (confirm('Are you sure you want to save ticket type?')) {
      upsertCol({
        variables: {
          input: values,
        },
      })
        .then((resp) => {
      
          if (_.get(resp, "data.upsertTicketType._id")) {
            toast.success('Ticket type successfully saved');
        
          } else {
            toast.error('Ticket type failed to save');
          }
        })
        .catch((error) => {

          toast.error('Ticket type failed to save');
        });
    }
  }

  useEffect(() => {
    if (code) {
      const typeName: string = ticketTypeIdentifier(code as string, "name") as string;
      setState((p) => ({ ...p, name: typeName }))
    }
  }, [code])






  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>

        {/* <TicketTypeDetails code={code}/> */}
        <CardRight>
          <>
            <span className='font-semibold'>  {state.name}</span>
          </>
        </CardRight>
        <TicketApprovers register={register} errors={errors} control={control} setValue={setValue} />
        <div className="text-end mb-4 ">
          <Button loading={false}>Save Details</Button>
        </div>
      </form>
    </div>
  )
}

export default TicketTypeFormComp