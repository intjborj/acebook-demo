import React from 'react'
import Card from '@/components/common/card';
import Description from '@admin/components/ui/description';
import { PropForm } from '@/types/forms/propHookForm';
import SelectInput from '@admin/components/ui/select-input';
import { SEARCH_ACCS } from '@graphql/operations/accounts/accountQueries';
import { useQuery } from '@apollo/client';
import Label from '@admin/components/ui/label';
import _ from 'lodash';
import { GET_ALL_DEPTS } from '@/graphql/queries/departments/departmentQueries';
type Props = {
  hookFormProp: PropForm;
};

const TicketServiceDepartment = ({ hookFormProp }: Props) => {
  const { register, errors, control } = hookFormProp

  const { data: departments, refetch: refectUsSearch } = useQuery(GET_ALL_DEPTS, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });

  

  return (
    <div className="my-5 flex flex-wrap sm:my-8">
      <Description
        title={'Service Department'}
        details={'The selected department will be authorized to receive and add works to the ticket. '}
        className="sm:pe-4 md:pe-5 w-full px-0 pb-5 sm:w-4/12 sm:py-8 md:w-1/3 "
      />

      <Card className="w-full sm:w-8/12 md:w-2/3">
        <div className="grid  gap-3 md:grid-cols-1 lg:grid-cols-1 z-0">
          <div>
            <Label>{'Default Service Department'}</Label>
            <SelectInput
              name="serviceDepartment"
              {...register('serviceDepartment')}
              // errors={errors.serviceDepartment?.message!}
              control={control}
              getOptionLabel={(option: any) => option.name}
              getOptionValue={(option: any) => option._id}
              options={_.get(departments, "departments.data")}
              isLoading={false}
            />
          </div>
        </div>

      </Card>
    </div>
  )
}

export default TicketServiceDepartment