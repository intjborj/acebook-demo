import React from 'react'
import * as categoriesIcon from "@admin/components/icons/category";
import { tagIcons } from '@/components/admin/components/tag/tag-icons';
import { getIcon } from "@utils/get-icon";
import Label from "@admin/components/ui/label";
import SelectInput from "@admin/components/ui/select-input";
import { postSelectStylesTags } from '@/components/admin/components/ui/select/post-select-tags.styles';
import { useQuery } from '@apollo/client';
import { GET_ALL_DEPTS } from '@/graphql/queries/departments/departmentQueries';
import _ from 'lodash'

type Props = {
    control: any;
    register: any;
}


const PostDepartmentTag = ({ control, register }: Props) => {
    const { data: alldepts, refetch } = useQuery(GET_ALL_DEPTS, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
    });


    return (
        <div>
            <div className="mb-5 ">
                <div className='w-full '>
                    <SelectInput
                        {...register('taggedDepartments')}
                        customStyle={postSelectStylesTags}
                        control={control}
                        options={
                            _.get(alldepts, 'departments.data')
                              ? _.get(alldepts, 'departments.data')
                              : []
                          }
                        getOptionLabel={(option: any) => option.name}
                        getOptionValue={(option: any) => option._id}
                        isClearable={false}
                        placeholder="@ Mention Departments"
                        isMulti={true}

                    />
                </div>

            </div>
        </div>
    )
}

export default PostDepartmentTag