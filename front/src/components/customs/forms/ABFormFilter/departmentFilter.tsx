import React from 'react'
import { useQuery } from '@apollo/client';
import { GET_ALL_DEPTS } from '@/graphql/queries/departments/departmentQueries';
import { selectFilterStyles } from '@/components/admin/components/ui/select/filter.styles';
import _ from 'lodash';
import SelectInput from '@admin/components/ui/select-input';
import { PropForm } from '@/types/forms/propHookForm';

type Props = {
    hookFormProp: PropForm
}

const DepartmentFilter = ({ hookFormProp }: Props) => {
    const { register, control } = hookFormProp
    const { data: alldepts, refetch } = useQuery(GET_ALL_DEPTS, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
    });
    return (
        <div>
            <span className='text-sm text-zinc-400 pl-0 md:pl-1 '>Department</span>
            <SelectInput

                dimension='small'
                {...register('department')}
                customStyle={selectFilterStyles}
                // errors={errors.type?.message!}
                placeholder='Department'
                control={control}
                getOptionLabel={(option: any) => option.name}
                // getOptionLabel={(option: any) => {option.firstName+", "+option.lastName}}
                getOptionValue={(option: any) => option.code}
                options={
                    _.get(alldepts, 'departments.data')
                        ? _.get(alldepts, 'departments.data')
                        : []
                }
                isLoading={false}
                isSearchable={true}
                isClearable={true}

            />
        </div>
    )
}

export default DepartmentFilter