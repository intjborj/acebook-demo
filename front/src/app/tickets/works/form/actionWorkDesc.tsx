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
import { workCategoryOptions } from '@/constants/tickets/works/options';

type Props = {
    hookFormProp: PropForm;
};



const ActionWorkDesc = ({ hookFormProp }: Props) => {
    const { register, errors, control } = hookFormProp


    return (
        <div className="my-5 flex flex-wrap sm:my-8">
            <Description
                title={'Action Taken/ Work Actually Done'}
                details={'Description/Remarks of action and work done'}
                className="sm:pe-4 md:pe-5 w-full px-0 pb-5 sm:w-4/12 sm:py-8 md:w-1/3 "
            />

            <Card className="w-full sm:w-8/12 md:w-2/3">

                <div className="grid  gap-3 md:grid-cols-1 lg:grid-cols-1">
                    <div>
                        <TextArea
                            label={'Description of actual work done'}
                            {...register('descActualWorkDone')}
                            error={errors?.descActualWorkDone?.message!}
                            variant="outline"
                            inputClassName='rounded-md'
                            className="mb-5"
                        />
                        <TextArea
                            label={'Findings'}
                            {...register('findings')}
                            error={errors?.findings?.message!}
                            variant="outline"
                            inputClassName='rounded-md'
                            className="mb-5"
                        />
                        <div>
                            <Label>{'Work Category'}</Label>
                            <SelectInput
                                {...register('workCategory')}
                                // errors={errors.department?.message!}
                                control={control}
                                getOptionLabel={(option: any) => option.label}
                                getOptionValue={(option: any) => option.value}
                                options={workCategoryOptions}
                                placeholder=""
                                isClearable={true}
                                isSearchable={true}
                                isLoading={false}
                            />
                        </div>
                    </div>

                </div>



            </Card>
        </div>
    )
}

export default ActionWorkDesc