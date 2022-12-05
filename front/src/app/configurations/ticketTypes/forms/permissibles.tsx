import React from 'react'
import _ from 'lodash';
import ABFormSectionLayout from '@/components/customs/layouts/forms/formSectionLayout';
import Checkbox from '@admin/components/ui/checkbox/checkbox';
import { PropForm } from '@/types/forms/propHookForm';

type Props = {
    hookFormProp: PropForm;
};
const Permissibles = ({ hookFormProp }: Props) => {
    const { register } = hookFormProp
    return (
        <ABFormSectionLayout title='Permissibles' description='Permitted functions of the ticket type'>
            <>
                <div className='grid grid-cols-1 relative'>
                    <div>
                        <Checkbox
                            {...register('isDisabled')}
                            // id="is_active"
                            label={`Disable this type`}
                            name={'isDisabled'}
                            // disabled={Boolean(false)}
                            // disabled={Boolean(is_external)}
                            className="mb-5"
                        />
                    </div>
                    {/* <span className='absolute text-xs pt-5 pl-6 text-zinc-400'>(Can add work even if there are no approvers specified)</span> */}
                </div>
                <div className='grid grid-cols-1 relative'>
                    <div >
                        <Checkbox
                            {...register('addWorkWOApprovers')}
                            // id="is_active"
                            label={`Add work without Approvers `}
                            name={'addWorkWOApprovers'}
                            // disabled={Boolean(false)}
                            // disabled={Boolean(is_external)}
                            className="mb-5"
                        />
                    </div>
                    {/* <span className='absolute text-xs pt-5 pl-6 text-zinc-400'>(Can add work even if there are no approvers specified)</span> */}
                </div>

                {/* <div className='pt-5 grid grid-cols-1 relative'> */}
                <div className=' grid grid-cols-1 relative'>
                    <div className='z-10'>
                        <Checkbox
                            {...register('addWorkWOAssignedP')}
                            // id="is_active"
                            label={'Add work without Assigned Personnel '}
                            name={'addWorkWOAssignedP'}
                            // disabled={Boolean(false)}
                            // disabled={Boolean(is_external)}
                            className="mb-5"
                        />
                    </div>
                    {/* <span className='absolute text-xs pt-10 pl-6 text-zinc-400'>(The user is permitted to add work even if no assigned workers are present or have yet received the assignment.)</span> */}

                </div>
            </>
        </ABFormSectionLayout>
    )
}

export default Permissibles