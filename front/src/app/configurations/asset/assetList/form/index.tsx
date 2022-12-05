import { AssetType, ManufacturerType } from '@/types/assets/assetsType';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQuery } from '@apollo/client';

import ABButton from '@/components/ui/buttons/ABbutton';
import Input from '@admin/components/ui/input';
import Label from '@admin/components/ui/label';
import SelectInput from '@admin/components/ui/select-input';

import ABFormSectionLayout from '@/components/customs/layouts/forms/formSectionLayout'


import { UPSERT_ASSET, UPSERT_MANUFACTURER } from '@graphql/operations/asset/assetMutations';
import { toast } from 'react-toastify';
import _, { isEmpty } from 'lodash';
import { assetValidationSchema } from './formvalidations/asset-validation-schema';
import { GET_ALL_DEPTS } from '@/graphql/queries/departments/departmentQueries';

type Props = {
    defaultVals?: AssetType
}

const AssetFormApp = ({ defaultVals }: Props) => {

    const hookFormProp = useForm<AssetType>({
        //@ts-ignore
        defaultValues: defaultVals ?? {},
        resolver: yupResolver(assetValidationSchema),
    });

    const [upsertAsset] = useMutation(UPSERT_ASSET);

    const { data: alldepts, refetch } = useQuery(GET_ALL_DEPTS, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
    });

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        watch,
        reset,
        setValue,
        getValues
    } = hookFormProp

    const onSubmit = (data: AssetType) => {
        if (confirm("Are you sure you want to save details?")) {
            let handlingDept = null

            if(data.handlingDepartment && data.handlingDepartment.length > 0 ){
                handlingDept = _.map(data.handlingDepartment, "_id")
            }

            let payload: AssetType = {
                _id: defaultVals?._id ?? null,
                name: data.name,
                description: data.description,
                count: data.count ? parseFloat(data.count.toString()) : 0,
                prefix: data.prefix,
                handlingDepartment: handlingDept
            }
          

            upsertAsset({
                variables: {
                    input: payload,
                },
            })
                .then((resp) => {
                    toast.success("Asset details successfully saved");
                    if (isEmpty(defaultVals?._id)) {
                        reset()
                    }
                })
                .catch((error) => {
                    toast.error("Failed to save asset details");
                });
        }
    }


    return (
        <div>

            <form onSubmit={handleSubmit(onSubmit)} className="pb-12">
                <ABFormSectionLayout
                    title='Basic Details'
                    description='Add basic details here'
                >
                    <>
                        <Input
                            label={'Name*'}
                            {...register('name')}
                            error={errors.name?.message!}
                            variant="outline"
                            className="mb-5"
                        />
                        <Input
                            label={'Description'}
                            {...register('description')}
                            // error={t(errors.firstName?.message!)}
                            variant="outline"
                            className="mb-5"
                        />
                        <Input
                            label={'Prefix'}
                            {...register('prefix')}
                            // error={t(errors.firstName?.message!)}
                            variant="outline"
                            className="mb-5"
                        />
                        <Input
                            label={'Count'}
                            {...register('count')}
                            // error={t(errors.firstName?.message!)}
                            variant="outline"
                            className="mb-5"
                        />

                        <Label>{'Handling Department *'}</Label>
                        <SelectInput

                            {...register('handlingDepartment')}
                            errors={errors.handlingDepartment?.message!}
                            control={control}
                            getOptionLabel={(option: any) => option.name}
                            getOptionValue={(option: any) => option._id}
                            options={
                                _.get(alldepts, 'departments.data')
                                    ? _.get(alldepts, 'departments.data')
                                    : []
                            }
                            placeholder="Handling Dept."
                            isLoading={false}
                            isSearchable={true}
                            isMulti={true}
                        />

                    </>
                    <div className='pt-5'>
                        <ABButton type='submit'>Save</ABButton>
                    </div>

                </ABFormSectionLayout>
            </form>
        </div>
    )
}

export default AssetFormApp