import Input from '@admin/components/ui/input';
import Button from '@admin/components/ui/button';
import Card from '@/components/common/card';
import Description from '@admin/components/ui/description';
import { getLayout } from '@/components/layouts/layout';
import { useTranslation } from 'next-i18next';
import TextArea from '@/components/ui/forms/text-area';
import SelectInput from '@admin/components/ui/select-input';
import Label from '@admin/components/ui/label';
import { TICKET_STATUS, TICKET_TYPE } from '@/constants/options';

type Props = {
  register?: any;
  errors?: any;
  control?: any;
  createdByOpt?: any
  watch?: any
  setValue?: any
};

const TicketDetails = ({ register, errors, control, createdByOpt, watch, setValue }: Props) => {
  return (
    <div className="my-5 flex flex-wrap sm:my-8">
      <Description
        title={'Ticket Details'}
        details={''}
        className="sm:pe-4 md:pe-5 w-full px-0 pb-5 sm:w-4/12 sm:py-8 md:w-1/3 "
      />

      <Card className="w-full sm:w-8/12 md:w-2/3">
        <div className="grid  gap-3 md:grid-cols-1 lg:grid-cols-1">
          <div className="mb-5">
            <Label>{'Status *'}</Label>
            <SelectInput
              {...register('status')}
              errors={errors.status?.message!}
              control={control}
              getOptionLabel={(option: any) => option.name}
              // getOptionLabel={(option: any) => {option.firstName+", "+option.lastName}}
              getOptionValue={(option: any) => option.code}
              options={TICKET_STATUS}
              isLoading={false}
            />
            {/* <Input
              label={'Status *'}
              {...register('status')}
              error={errors.subject?.message!}
              variant="outline"
              className="mb-5"
            /> */}
          </div>
        </div>


      </Card>
    </div>
  )
}

export default TicketDetails