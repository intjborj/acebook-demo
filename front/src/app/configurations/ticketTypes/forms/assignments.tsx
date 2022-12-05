import React from 'react'
import Card from '@/components/common/card';
import Description from '@admin/components/ui/description';
import { PropForm } from '@/types/forms/propHookForm';
import SelectInput from '@admin/components/ui/select-input';
import Label from '@admin/components/ui/label';
import _ from 'lodash';
import { useUserSearch } from '@/hooks/useUserSearch';

type Props = {}

const TicketAssignment = ({ register, errors, control, setValue }: PropForm) => {
  const { result: userResult, search: searchUser } = useUserSearch()

  const getUserChange = (data: any) => {
    setValue("assignments", data)
  }

  return (
    <div className="my-5 flex flex-wrap sm:my-8">
      <Description
        title={'Default Ticket Assignment'}
        details={'Configure assignments of this ticket type. Authorized staff to do the assigned ticket. '}
        className="sm:pe-4 md:pe-5 w-full px-0 pb-5 sm:w-4/12 sm:py-8 md:w-1/3 "
      />

      <Card className="w-full sm:w-8/12 md:w-2/3">
        <div className="grid  gap-3 md:grid-cols-1 lg:grid-cols-1">
          <div>
            <Label>{'Assignments'}</Label>
            <SelectInput
              name="assignments"
              {...register('assignments')}
              errors={errors.assignments?.message!}
              control={control}
              // getOptionLabel={(option: any) =><ABSelectOptLabel> { option.firstName + ", " + option.lastName}</ABSelectOptLabel>}
              getOptionLabel={(option: any) => option.firstName+", "+option.lastName}
              getOptionValue={(option: any) => option._id}
              options={userResult}
              onInputChange={searchUser}
              isLoading={false}
              onChange={getUserChange}
              onSelectChange={getUserChange}
              isMulti={true}
            />
          </div>
        </div>

      </Card>
    </div>
  )
}

export default TicketAssignment