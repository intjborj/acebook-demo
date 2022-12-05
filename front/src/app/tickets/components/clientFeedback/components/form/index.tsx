import { PropForm } from '@/types/forms/propHookForm'
import React from 'react'
import TextArea from '@/components/ui/forms/text-area';
import ABButton from '@/components/ui/buttons/ABbutton';

type Props = {
    hookFormProp: PropForm,
    onSubmit?: (data: any) => void,
    submitCallback?: (data: any) => void,
    cancelCallback?: (data: any) => void,
    isCancellable?: boolean,
}

const ClientFeedbackForm = ({ hookFormProp, onSubmit, submitCallback, isCancellable, cancelCallback }: Props) => {
    const { register, errors, handleSubmit } = hookFormProp

    const submitProcess = (data: any)=>{
            if(onSubmit){
                onSubmit(data)
            }

            if(submitCallback){
                submitCallback(data)
            }
    }

    return (
        <div>
            <TextArea
                // label={'Description of actual work done'}
                
                {...register('message')}
                error={errors?.message?.message!}
                variant="outline"
                inputClassName='rounded-md'
                className="mb-5"
                placeholder='What can you say about our service?'
            />
            <div className=' flex justify-end gap-2'>
                {(cancelCallback && isCancellable )&& <ABButton category='normal' type='submit' onClick={cancelCallback}>Cancel</ABButton>}
                {onSubmit && <ABButton type='submit' onClick={handleSubmit(submitProcess)}>Send</ABButton>}
            </div>
        </div>
    )


}

export default ClientFeedbackForm