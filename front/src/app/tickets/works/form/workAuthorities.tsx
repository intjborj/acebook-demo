import ABFormSectionLayout from '@/components/customs/layouts/forms/formSectionLayout'
import { GET_ALL_DEPTS } from '@/graphql/queries/departments/departmentQueries';
import { useQuery, useMutation } from '@apollo/client';
import Label from '@admin/components/ui/label';
import React from 'react'
import { PropForm } from '@/types/forms/propHookForm'
import SelectInput from '@admin/components/ui/select-input';
import _ from 'lodash';
import { useUserSearch } from '@/hooks/useUserSearch';

type Props = {
    hookFormProp: PropForm
}

const WorkAuthorities = ({ hookFormProp }: Props) => {
    const { result, search: searchUser } = useUserSearch()
    const { register, control } = hookFormProp

    const { data: alldepts, refetch } = useQuery(GET_ALL_DEPTS, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
    });

    return (
        <div >
            <ABFormSectionLayout title='Authorization' description='Work AUthorities'>
                <div className='grid grid-cols-1 gap-3'>
                    <div>
                        <Label>{'Performed By'}</Label>
                        <SelectInput
                            name="performedBy"
                            {...register('performedBy')}
                            // errors={errors.performedBy?.message!}
                            control={control}
                            getOptionLabel={(option: any) => option.firstName + ", " + option.lastName}
                            getOptionValue={(option: any) => option._id}
                            options={result}
                            isLoading={false}
                            isClearable={true}
                            isMulti={true}
                            onInputChange={searchUser}
                        />
                    </div>
                    <div>
                        <Label>{'Receiving Department'}</Label>
                        <SelectInput
                            {...register('submissionDepartment')}
                            // errors={errors.department?.message!}
                            control={control}
                            getOptionLabel={(option: any) => option.name}
                            getOptionValue={(option: any) => option._id}
                            options={
                                _.get(alldepts, 'departments.data')
                                    ? _.get(alldepts, 'departments.data')
                                    : []
                            }
                            placeholder=""
                            isClearable={true}
                            isSearchable={true}
                            isLoading={false}
                            isMulti={true}
                        />
                    </div>

                </div>
            </ABFormSectionLayout>
        </div>
    )
}

export default WorkAuthorities