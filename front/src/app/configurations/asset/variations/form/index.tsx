import React from 'react'
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { AssetVariationFormType } from '@/types/assets/assetsType';
import { UPSERT_ASSET_VARIATION } from '@graphql/operations/asset/assetMutations';
import Label from '@admin/components/ui/label';
import * as yup from 'yup';

import ABButton from '@/components/ui/buttons/ABbutton';
import Input from '@admin/components/ui/input';

import ABFormSectionLayout from '@/components/customs/layouts/forms/formSectionLayout'
import SelectInput from '@admin/components/ui/select-input';
import { GET_ALL_MANUFACTURER, GET_ALL_SUPPLIER } from '@graphql/operations/asset/assetQueries';
import _, { isEmpty } from 'lodash';
import { LabelColor } from '@/constants/enums/themes';
import { toast } from 'react-toastify';

type Props = {
    assetId?: string,
    defaultVals?: AssetVariationFormType,
    hideDescription?: boolean,
}

export const assetVarValidationSchema = yup.object().shape( {
    model: yup.string().required('Required field'),
  });
  
  

const VariationFormApp = ({ assetId, defaultVals, hideDescription }: Props) => {


    const { data: allManufact, refetch } = useQuery(GET_ALL_MANUFACTURER, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
    });

    const { data: allSupplier, refetch: refetchSup } = useQuery(GET_ALL_SUPPLIER, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
    });


    const hookFormProp = useForm<AssetVariationFormType>({
        //@ts-ignore
        defaultValues: defaultVals ?? {},
        resolver: yupResolver(assetVarValidationSchema),
    });

    const [upsertAssetVar] = useMutation(UPSERT_ASSET_VARIATION);

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


    const onSubmit = (data: AssetVariationFormType) => {
        let payload: AssetVariationFormType = {
            _id: defaultVals?._id ?? null,
            serialNo: data.serialNo,
            propertyCode: data.propertyCode,
            model: data.model,
            asset: assetId,
            manufacturer: _.get(data, "manufacturer._id"),
            cost:  data.cost ? parseFloat(data.cost.toString()): null,
            condition: data.condition,
            ipms: data.ipms,
            description: data.description,
            deployedDate: data.deployedDate,
            supplier: data.supplier ? _.get(data.supplier,"_id") : null,
        }

        if (confirm("Are you sure you want to save details?")) {
            upsertAssetVar({
                variables: {
                    input: payload,
                },
            })
                .then((resp) => {
                    toast.success("Asset variation details successfully saved");
                    // if (isEmpty(defaultVals?._id)) {
                    //     reset()
                    // }
                    if (isEmpty(defaultVals)) {
                        reset()
                    }
                })
                .catch((error) => {
                    toast.error("Failed to save asset variation details");
                });
        }

    }

    const NoLayoutForm = () => (
        <>
            <>
                <Input
                    label={'Model *'}
                    {...register('model')}
                    error={errors.model?.message!}
                    variant="outline"
                    className="mb-5"
                />
                <Input
                    label={'Description'}
                    {...register('description')}
                    variant="outline"
                    className="mb-5"
                />


                <div className=' grid md:grid-cols-2 gap-2'>
                    <Input
                        label={'Property Code'}
                        {...register('propertyCode')}
                        variant="outline"
                        className="mb-5"
                    />
                    <Input
                        label={'Serial No.'}
                        {...register('serialNo')}
                        variant="outline"
                        className="mb-5"
                    />
                    <Input
                        label={'Cost'}
                        {...register('cost')}
                        variant="outline"
                        className="mb-5"
                        type='number'
                    />
                    <Input
                        label={'Condition'}
                        {...register('condition')}
                        variant="outline"
                        className="mb-5"
                    />
                    <Input
                        label={'Deployed Date'}
                        {...register('deployedDate')}
                        variant="outline"
                        className="mb-5"
                        type='date'
                    />
                    <Input
                        label={'IPMS'}
                        {...register('ipms')}
                        variant="outline"
                        className="mb-5"
                        type='date'
                    />
                </div>


                <div className=' grid md:grid-cols-2 gap-2'>

                    <div>
                        <Label>Manufacturer</Label>
                        {(allManufact && _.get(allManufact, "manufacturers.data").length > 0) ?
                            <SelectInput

                                {...register('manufacturer')}
                                // errors={t(errors.department?.message!)}
                                control={control}
                                getOptionLabel={(option: any) => option.name}
                                getOptionValue={(option: any) => option._id}
                                options={_.get(allManufact, "manufacturers.data")}
                                isLoading={false}
                                // isMulti={true}
                                isSearchable={true}
                                placeholder="Manufacturer"
                            />
                            : <span className={`${LabelColor.SECONDARY} text-xs`}>*No manufacture data</span>
                        }
                    </div>
                    <div>
                        <div className='pt-4 md:pt-0'>
                            <Label>Supplier</Label>
                            {(allSupplier && _.get(allSupplier, "assSuppliers.data").length > 0) ?
                                <SelectInput
                                    {...register('supplier')}
                                    // errors={t(errors.department?.message!)}
                                    control={control}
                                    getOptionLabel={(option: any) => option.name}
                                    getOptionValue={(option: any) => option._id}
                                    options={_.get(allSupplier, "assSuppliers.data")}
                                    isLoading={false}
                                    // isMulti={true}
                                    isSearchable={true}
                                    placeholder="Supplier"
                                />
                                : <span className={`${LabelColor.SECONDARY} text-xs`}>*No supplier data</span>
                            }
                        </div>
                    </div>
                </div>
            </>
            <div className='pt-5 flex justify-end'>   <ABButton type='submit'>Save</ABButton></div>
        </>
    )


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="pb-12">
                {hideDescription ?
                    <NoLayoutForm />
                    :
                    <ABFormSectionLayout
                        title='Basic Details'
                        description='Add basic details here'
                        hideDescription={hideDescription}
                    >
                        <NoLayoutForm />
                    </ABFormSectionLayout>}
            </form>
        </div>
    )
}

export default VariationFormApp