import { ManufacturerType, SupplierType } from '@/types/assets/assetsType';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';

import ABButton from '@/components/ui/buttons/ABbutton';
import Input from '@admin/components/ui/input';

import ABFormSectionLayout from '@/components/customs/layouts/forms/formSectionLayout'
// import { manuValidationSchema } from './formvalidations/manu-validation-schema';

import { UPSERT_MANUFACTURER, UPSERT_SUPPLIER } from '@graphql/operations/asset/assetMutations';
import { toast } from 'react-toastify';
import { isEmpty } from 'lodash';
import * as yup from 'yup';

const supValidationSchema = yup.object().shape( {
  name: yup.string().required('Required field'),
});


type Props = {
    defaultVals?: SupplierType
}

const SupplierFormApp = ({defaultVals}: Props) => {

    const hookFormProp = useForm<SupplierType>({
        //@ts-ignore
        defaultValues: defaultVals ?? {},
        resolver: yupResolver(supValidationSchema),
    });

    const [upsertSupplier] = useMutation(UPSERT_SUPPLIER);

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


    const onSubmit = (data: SupplierType) => {
        if (confirm("Are you sure you want to save details?")) {
            let payload: SupplierType = {
              _id: defaultVals?._id ?? null,
            }

            payload = {...payload, ...data}
      
            upsertSupplier({
              variables: {
                input: payload,
              },
            })
              .then((resp) => {
                toast.success("Supplier details successfully saved");
                if(isEmpty(defaultVals?._id)){
                  reset()
                }
              })
              .catch((error) => {
                toast.error("Failed to save supplier details");
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
                            label={'Mobile'}
                            {...register('mobile')}
                            // error={t(errors.firstName?.message!)}
                            variant="outline"
                            className="mb-5"
                        />
                        <Input
                            label={'Email'}
                            {...register('email')}
                            // error={t(errors.firstName?.message!)}
                            variant="outline"
                            className="mb-5"
                        />

                        <Input
                            label={'url'}
                            {...register('url')}
                            // error={t(errors.firstName?.message!)}
                            variant="outline"
                            className="mb-5"
                        />

                        <Input
                            label={'Information'}
                            {...register('information')}
                            // error={t(errors.firstName?.message!)}
                            variant="outline"
                            className="mb-5"
                        />

                        <Input
                            label={'Address'}
                            {...register('address')}
                            // error={t(errors.firstName?.message!)}
                            variant="outline"
                            className="mb-5"
                        />
                    </>
                  
                </ABFormSectionLayout>

                <ABFormSectionLayout
                    title='Contact Details'
                    description='Add contact details here'
                >
                    <>
                        <Input
                            label={'Contact Person'}
                            {...register('contactPerson')}
                            variant="outline"
                            className="mb-5"
                        />
                        <Input
                            label={'Contact Telephone'}
                            {...register('contactTelephone')}
                            // error={t(errors.firstName?.message!)}
                            variant="outline"
                            className="mb-5"
                        />
                        <Input
                            label={'Contact Email'}
                            {...register('contactEmail')}
                            // error={t(errors.firstName?.message!)}
                            variant="outline"
                            className="mb-5"
                        />
                    </>
                    <ABButton type='submit'>Save</ABButton>
                </ABFormSectionLayout>
            </form>



        </div>
    )
}

export default SupplierFormApp