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

type Props = {
    register?: any;
    errors?: any;
    control?: any;
};

const TicketDescription = ({ register, errors, control }: Props) => {
    return (
        <div className="my-5 flex flex-wrap sm:my-8">
            <Description
                title={'Ticket Description'}
                details={'Add basic details of the ticket.'}
                className="sm:pe-4 md:pe-5 w-full px-0 pb-5 sm:w-4/12 sm:py-8 md:w-1/3 "
            />

            <Card className="w-full sm:w-8/12 md:w-2/3">
                <div className="grid  gap-3 md:grid-cols-1 lg:grid-cols-1">
                    <div>
                        <Input
                            label={'Subject *'}
                            {...register('subject')}
                            error={errors.subject?.message!}
                            variant="outline"
                            className="mb-5"
                        />
                    </div>
                </div>
                <div className="grid  gap-3 md:grid-cols-1 lg:grid-cols-1">
                    <div>
                        <TextArea
                            label={'Description *'}
                            {...register('description')}
                            error={errors.description?.message!}
                            variant="outline"
                            inputClassName='rounded-md'
                            className="mb-5"
                        />
                    </div>

                </div>
                <div className="grid  gap-3 md:grid-cols-2 lg:grid-cols-2">
                    <div>
                        <Input
                            label={'Date Requested '}
                            {...register('dateRequested')}
                            error={errors.dateRequested?.message!}
                            variant="outline"
                            className="mb-5"
                            type='date'
                        />
                    </div>
                    <div>
                        <Input
                            label={'Date Needed *'}
                            {...register('dateNeeded')}
                            error={errors.dateNeeded?.message!}
                            variant="outline"
                            className="mb-5"
                            type='datetime-local'
                        />
                    </div>


                </div>
                <div className="grid  gap-3 md:grid-cols-1 lg:grid-cols-1">
                    <div>
                        {/* <Input
                            label={'Ticket Type *'}
                            {...register('createdBy')}
                            error={errors.subject?.message!}
                            variant="outline"
                            className="mb-5"
                        /> */}
                        <div className="mb-5">
                            <Label>{'Ticket Type *'}</Label>
                            <SelectInput
                                {...register('type')}
                                errors={errors.type?.message!}
                                control={control}
                                getOptionLabel={(option: any) => option.name}
                                // getOptionLabel={(option: any) => {option.firstName+", "+option.lastName}}
                                getOptionValue={(option: any) => option.code}
                                options={TICKET_TYPE}
                                isLoading={false}
                            />
                        </div>
                    </div>
                </div>

            </Card>
        </div>
    )
}

export default TicketDescription