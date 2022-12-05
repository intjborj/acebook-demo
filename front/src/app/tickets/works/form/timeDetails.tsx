import Input from '@admin/components/ui/input';
import Button from '@admin/components/ui/button';
import Card from '@/components/common/card';
import Description from '@admin/components/ui/description';
import { getLayout } from '@/components/layouts/layout';
import { useTranslation } from 'next-i18next';
import TextArea from '@/components/ui/forms/text-area';
import SelectInput from '@admin/components/ui/select-input';
import Label from '@admin/components/ui/label';
import { TICKET_TYPE } from '@/constants/options';
import { PropForm } from '@/types/forms/propHookForm'

type Props = {
    hookFormProp: PropForm;
};

const TimeDetails = ({ hookFormProp }: Props) => {
    const { register, errors } = hookFormProp


    return (
        <div className="my-5 flex flex-wrap sm:my-8">
            <Description
                title={'Time Details'}
                details={'Time details of the work done'}
                className="sm:pe-4 md:pe-5 w-full px-0 pb-5 sm:w-4/12 sm:py-8 md:w-1/3 "
            />

            <Card className="w-full sm:w-8/12 md:w-2/3">

                <div className="grid  gap-3 md:grid-cols-2 lg:grid-cols-2">
                    
                        <Input
                            label={'Date/time Started '}
                            {...register('dateTimeStarted')}
                            error={errors?.dateTimeStarted?.message!}
                            variant="outline"
                            className="mb-5"
                            type='datetime-local'
                        />
                        <Input
                            label={'Date/time Finished'}
                            {...register('dateTimeFinished')}
                            error={errors?.dateTimeFinished?.message!}
                            variant="outline"
                            className="mb-5"
                            type='datetime-local'
                        />
                    

                </div>



            </Card>
        </div>
    )
}

export default TimeDetails