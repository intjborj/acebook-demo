import React, { useState } from 'react'
import Card from '@/components/common/card';
import ABButton, { ButtonCategory } from '@/components/ui/buttons/ABbutton';
import { CHANGE_TICKET_STATUS, GET_ARCHIVED } from '@graphql/operations/tickets/ticketMutation';
import { useMutation } from '@apollo/client';
import { TicketStatus } from '@/constants/enums/paths';
import { toast } from 'react-toastify';
import { PostContextRd, PostContextType } from '@/reducers/posts/postContextRd';
import { TicketTypeForm } from '@/types/tickets/ticketType';
import ABDisplaySectionLabel from '@/components/customs/layouts/ABDisplaySectionLabel';
import ABModal from "@/components/customs/modals/ABModal";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ticketRemarksValidationSchema } from './formvalidations/ticketremark-validation-schema';
import TextArea from '@/components/ui/forms/text-area';
import BorderDashed from '@/components/ui/border';
import { ContainerBgColor, LabelColor } from '@/constants/enums/themes';

type Props = {
    ticketId?: string,
    hasReceived?: boolean;
    hasWorks?: boolean;
    hasCompletedAllWorks?: boolean;
    ticketTypeData?: TicketTypeForm;
    ticketData?: any
}

type StateType = {
    selectedStatus?: string | null;
}

type FormType = {
    remarks: string
}

const TicketMarks = ({ ticketId, hasReceived, hasWorks, hasCompletedAllWorks, ticketTypeData, ticketData }: Props) => {

    const [state, setState] = useState<StateType>({ selectedStatus: null })
    const [statePostRd, dispatchPostRd] = React.useContext<any>(PostContextRd)

    const [changeStatus] = useMutation(CHANGE_TICKET_STATUS);

    const hookFormProp = useForm<FormType>({
        //@ts-ignore
        // defaultValues: postDefault ?? defaultVals,
        resolver: yupResolver(ticketRemarksValidationSchema),
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

    const processChange = (status: string, remarks: string) => {
        changeStatus({
            variables: {
                input: {
                    _id: ticketId, // ticket id
                    status: status,
                    remarks: remarks
                }

            },
        })
            .then((resp) => {
                dispatchPostRd({ type: "refetch", modalData: true })
                toast.success("Status changed successfully")

            })
            .catch((error) => {
                toast.error("Failed to change status")

            });
    }

    const onSubmit = (data: FormType) => {
        if (confirm("Are you sure you want to change ticket status?") && state.selectedStatus) {
            processChange(state.selectedStatus as string, data.remarks)
        }
    }

    const onSelectStatus = (status: string) => {
        setState((p) => ({ ...p, selectedStatus: status }))
    }

    const StatusOpt = () => (
        <div className='flex justify-center pt-4'>
            <div className='grid grid-flow-col auto-cols-max w-fit  gap-1'>
                {/* {hasReceived === true ? */}
                {/* <> */}
                {
                    hasWorks === false

                        // ||( hasReceived === true && ticketData.assignedPersonnel.length > 0)
                        || (hasWorks === true && hasCompletedAllWorks === true)
                        // || ticketTypeData?.addWorkWOApprovers == true
                        // || (ticketTypeData?.addWorkWOAssignedP == true && !['draft', 'pending', 'disapproved'].includes(ticketData?.status ?? ''))
                        ?
                        <div className='w-fit'>
                            <ABButton onClick={() => onSelectStatus(TicketStatus.SUCCESS)} category={ButtonCategory.SUCCESS} height='h-2' className=' min-w-fit max-w-50 w-24'>Success</ABButton></div>
                        : <></>}

                {/* </> : ''

                        } */}
                <div className='flex justify-center w-fit'> <ABButton onClick={() => onSelectStatus(TicketStatus.CLOSED)} category={ButtonCategory.SECONDARY} height='h-2' className=' min-w-fit max-w-50 w-24 flex justify-center'>Closed</ABButton></div>
                <div className='w-fit'>  <ABButton onClick={() => onSelectStatus(TicketStatus.FAILED)} category={ButtonCategory.NORMAL} height='h-2' className=' min-w-fit max-w-50 w-24 flex justify-center'>Failed</ABButton></div>
            </div>
        </div>
    )

    return (
        <div>
            <Card>
                {ticketData?.remarks &&
                    <div className='pb-3'>
                        <div className={`${ContainerBgColor.PRIMARY} ${LabelColor.SECONDARY} rounded p-1 mt-1 px-3  text-sm grid grid-cols-1`}>
                            <span className={`${LabelColor.PRIMARY} font-semibold`}>Remarks</span>
                            <span className={``}>{ticketData?.remarks}</span>
                        </div>
                    </div>
                }
                <ABDisplaySectionLabel>Mark Ticket As</ABDisplaySectionLabel>

                <ABModal button={<StatusOpt />}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextArea
                            label={'Remarks *'}
                            {...register('remarks')}
                            error={errors.remarks?.message!}
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
            </Card >
        </div >
    )
}

export default TicketMarks