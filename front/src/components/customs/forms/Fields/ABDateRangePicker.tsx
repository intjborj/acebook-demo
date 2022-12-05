import React from 'react'
import Input from '@admin/components/ui/input';
import { PropForm } from '@/types/forms/propHookForm';

type Props = {
    hookFormProp: PropForm;
    label?: string;
}

const ABDateRangePicker = ({ hookFormProp, label }: Props) => {
    const { register, errors, watch } = hookFormProp
    return (
        <div className='grid grid-cols-1 gap-1'>
             {label ? <span className='text-sm text-zinc-400 pl-0 md:pl-1 '>{label}</span> : <></>}
            <div className="flex justify-center ">
            {/* <div className="flex justify-center scale-90 md:scale-100"> */}
               
               
                <div className='grid grid-cols-2 gap-3 w-full'>
                {/* <div className='flex  gap-2'> */}

                    <Input
                        {...register('startDate')}
                        // error={errors.dateRequested?.message!}
                        variant="outline"
                        className="w-full"
                        // className="mb-5"
                        type='date'
                        dimension='small'
                        // inputClassName='w-[9.3rem] md:w-[9.6rem]'
                        inputClassName='w-full'
                        max={watch('endDate')}
                    />
                    {/* <span className='grid content-center'>-</span> */}
                    <Input
                        // label={'Date Requested '}
                        {...register('endDate')}
                        // error={errors.dateRequested?.message!}
                        variant="outline"
                        className=""
                        // inputClassName='w-[9.3rem] md:w-[9.6rem]'
                        // className="mb-5"
                        type='date'
                        dimension='small'
                        min={watch('startDate')}
                    />
                </div>
            </div>
        </div>
    )
}

export default ABDateRangePicker