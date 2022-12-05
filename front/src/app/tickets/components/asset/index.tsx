import ABFormSectionLayout from '@/components/customs/layouts/forms/formSectionLayout'
import React from 'react'
import SelectInput from '@admin/components/ui/select-input';
import Label from '@admin/components/ui/label';
import { PropForm } from '@/types/forms/propHookForm';
import { useAssetSearch } from '@/hooks/useAssetSearch';

type Props = {
    hookFormProp: PropForm
}

const AssetTicketForm = ({hookFormProp}: Props) => {
    
  const { register, errors, getValues, setValue, watch, control } = hookFormProp
    
  const {result,search} = useAssetSearch()
  
  
  return (
        <div>
            <ABFormSectionLayout
                title='Asset Affected'
                description='If the concern involves equipments/item please search and select asset.'
            >
                <>
                    <Label>{'Asset'}</Label>
                    <SelectInput
                        {...register('asset')}
                        // errors={errors.type?.message!}
                        control={control}
                        getOptionLabel={(option: any) => option.name}
                        getOptionValue={(option: any) => option._id}
                        options={result}
                        isLoading={false}
                        onInputChange={search}
                    />
                </>
            </ABFormSectionLayout>
        </div>
    )
}

export default AssetTicketForm