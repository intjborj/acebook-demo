import React from 'react'
import ABFormSectionLayout from '@/components/customs/layouts/forms/formSectionLayout'
import SelectInput from '@admin/components/ui/select-input';
import Label from '@admin/components/ui/label';
import { PropForm } from '@/types/forms/propHookForm';
import { useQuery } from '@apollo/client';
import { GET_ASSET_VARIATION_FR_TICKT } from '@graphql/operations/tickets/ticketQueries';
import { useRouter } from 'next/router';
import _ from 'lodash';
import ABModal from '@/components/customs/modals/ABModal';
import ABButton from '@/components/ui/buttons/ABbutton';
import WorkFormApp from '.';
import DirectAssetVariation from './directAssetVariation';
import BorderDashed from '@/components/ui/border';
type Props = {
    hookFormProp: PropForm,
    ticketId?: string
}


const AssetVariationWorkForm = ({ hookFormProp, ticketId }: Props) => {
    // const { query } = useRouter();
    // const { searchType, id: ticketId, ...restQuery } = query;
    const { register, errors, getValues, setValue, watch, control } = hookFormProp

    const { data: assVarData, refetch } = useQuery(GET_ASSET_VARIATION_FR_TICKT, {
        variables: {
            id: ticketId
        },
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
    });

    return (

        <ABFormSectionLayout
            title='Asset Variation Affected'
            description='If the ticket involves equipments/item please select the variation affected of the asset.'
        >
            <>
                <div className='grid grid-cols-2 mb-2'>
                    <Label>{'Asset Variation'}</Label>
                    {_.get(assVarData, "tickets.data[0].asset._id") && 
                    <ABModal
                 onClose={()=>{refetch()}}
                    button={
                        <div className='flex justify-end'>
                            <ABButton>+ New Variation</ABButton>
                        </div>
                    }>
                       <div className='p-4 w-full'><DirectAssetVariation assetId={_.get(assVarData, "tickets.data[0].asset._id")}/> </div> 
                        <BorderDashed/>
                    </ABModal>}
                </div>


                <SelectInput
                    {...register('assetVariation')}
                    
                    // errors={errors.type?.message!}
                    control={control}
                    getOptionLabel={(option: any) => `${option.model} ${option.propertyCode ? `(${option.propertyCode})` : ''}`}
                    getOptionValue={(option: any) => option._id}
                    options={_.get(assVarData, "tickets.data[0].asset.assetVariation")}
                    isLoading={false}
                    isMulti={true}
                // onInputChange={search}
                />
            </>
        </ABFormSectionLayout>

    )
}

export default AssetVariationWorkForm