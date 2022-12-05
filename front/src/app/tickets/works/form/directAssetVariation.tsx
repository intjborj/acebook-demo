import React from 'react'
import { useQuery, useMutation } from '@apollo/client';
import { GET_SPEC_ASSET } from '@graphql/operations/asset/assetQueries';
import _, { isEmpty } from 'lodash';
import Spinner from '@/components/ui/loaders/spinner/spinner';
import AssetVariationsApp from '@/app/configurations/asset/variations';
import VariationFormApp from '@/app/configurations/asset/variations/form';

type Props = {
    assetId?: string;
}

const DirectAssetVariation = ({ assetId }: Props) => {
    const { data: specAss, refetch } = useQuery(GET_SPEC_ASSET, {
        variables: {
            id: assetId
        },
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
    });


    return (
        <div>
            {(!isEmpty(specAss) && _.get(specAss, "asset.data")) ? <VariationFormApp hideDescription={true} assetId={assetId} /> : <Spinner />}
        </div>
    )
}

export default DirectAssetVariation