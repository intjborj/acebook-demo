import { ManufacturerType } from '@/types/assets/assetsType';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';

import ABButton from '@/components/ui/buttons/ABbutton';
import Input from '@admin/components/ui/input';

import ABFormSectionLayout from '@/components/customs/layouts/forms/formSectionLayout'
import { manuValidationSchema } from './formvalidations/manu-validation-schema';

import { UPSERT_MANUFACTURER } from '@graphql/operations/asset/assetMutations';
import { toast } from 'react-toastify';
import { isEmpty } from 'lodash';

type Props = {
  defaultVals?: ManufacturerType
}

const AssManufacturerForm = ({defaultVals}: Props) => {

  const hookFormProp = useForm<ManufacturerType>({
    //@ts-ignore
    defaultValues: defaultVals ?? {},
    resolver: yupResolver(manuValidationSchema),
  });

  const [upsertManu] = useMutation(UPSERT_MANUFACTURER);

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



  const onSubmit = (data: ManufacturerType) => {


    if (confirm("Are you sure you want to save details?")) {
      let payload: ManufacturerType = {
        _id: defaultVals?._id ?? null,
        name: data.name,
        mobile: data.mobile
      }

      upsertManu({
        variables: {
          input: payload,
        },
      })
        .then((resp) => {
         

          toast.success("Manufacturer details successfully saved");
          if(isEmpty(defaultVals?._id)){
            reset()
          }
        })
        .catch((error) => {
          toast.error("Failed to save manufacturer details");
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
              // error={t(errors.firstName?.message!)}
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
          </>
          <ABButton type='submit'>Save</ABButton>
        </ABFormSectionLayout>
      </form>
    </div>
  )
}

export default AssManufacturerForm