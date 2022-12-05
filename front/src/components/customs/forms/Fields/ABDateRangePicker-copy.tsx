import React from 'react'
import Input from '@admin/components/ui/input';
import { PropForm } from '@/types/forms/propHookForm';
import { register } from 'react-scroll/modules/mixins/scroller';

type Props = {
    hookFormProp: PropForm;
    label?: string;
}

const ABDateRangePicker = ({ hookFormProp, label }: Props) => {
    const { register, errors, watch } = hookFormProp
    return (
        <div className='grid grid-cols-1 gap-1'>
             {label ? <span className='text-sm text-zinc-400 pl-0 md:pl-1 '>{label}</span> : <></>}
            <div className="flex justify-center scale-90 md:scale-100">
                {/* <div className="relative">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                    </div>
                    <input name="start" type="date" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date start"/>
                </div>
                <span className="mx-4 text-gray-500">to</span>
                <div className="relative">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                    </div>
                    <input name="end"  type="date" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date end"/>
                </div> */}
               
                <div className='flex  gap-2'>

                    <Input
                        // label={'Date Requested '}
                        {...register('startDate')}
                        // error={errors.dateRequested?.message!}
                        variant="outline"
                        className=""
                        // className="mb-5"
                        type='date'
                        dimension='small'
                        inputClassName='w-[9.3rem] md:w-[9.6rem]'
                        max={watch('endDate')}
                    />
                    <span className='grid content-center'>-</span>
                    <Input
                        // label={'Date Requested '}
                        {...register('endDate')}
                        // error={errors.dateRequested?.message!}
                        variant="outline"
                        className=""
                        inputClassName='w-[9.3rem] md:w-[9.6rem]'
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