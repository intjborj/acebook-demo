import React from 'react'
import Input from '@admin/components/ui/input';
import Card from '@/components/common/card';
import Description from '@admin/components/ui/description';
import { PropForm } from '@/types/forms/propHookForm';
import SelectInput from '@admin/components/ui/select-input';
import { SEARCH_ACCS } from '@graphql/operations/accounts/accountQueries';
import { useQuery } from '@apollo/client';
import Label from '@admin/components/ui/label';
import _ from 'lodash';

type Props = {}

const TicketApprovers = ({ register, errors, control, setValue }: PropForm) => {

  const { data: searchedUser, refetch: refectUsSearch } = useQuery(SEARCH_ACCS, {
    variables: {
      name: null
    },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });

  const getUserInputChange = (data: any) => {
    if (data != null || data != undefined || data != " ") {
      setTimeout(function () {
        refectUsSearch({
          name: data
        })
      }, 500);
    }
  }

  const getUserChange = (data: any) => {
    setValue("approvers", data)
  }



  return (
    <div className="my-5 flex flex-wrap sm:my-8">
      <Description
        title={'Ticket Assignatories'}
        details={'Configure assignatories of this ticket type'}
        className="sm:pe-4 md:pe-5 w-full px-0 pb-5 sm:w-4/12 sm:py-8 md:w-1/3 "
      />

      <Card className="w-full sm:w-8/12 md:w-2/3">
        <div className="grid  gap-3 md:grid-cols-1 lg:grid-cols-1">
          <div>
            <Label>{'Approvers'}</Label>
            <SelectInput
              name="approvers"
              {...register('approvers')}
              errors={errors.approvers?.message!}
              control={control}
              getOptionLabel={(option: any) => option.firstName + ", " + option.lastName}
              // getOptionLabel={(option: any) => {option.firstName+", "+option.lastName}}
              getOptionValue={(option: any) => option._id}
              options={_.get(searchedUser, "search_accounts.data")}
              onInputChange={getUserInputChange}
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

export default TicketApprovers