import React from 'react'
import type { NextPageWithLayout } from '@/types';
import { getLayout } from '@/components/layouts/layout';
import { adminOnly } from '@/utils/auth-utils';
import ModClassicLayout from '@/components/layouts/mod-classic';
import ManufacturerApp from '@/app/configurations/asset/manufacturer';
import { FrontPath } from '@/constants/enums/paths';
import AssetListApp from '@/app/configurations/asset/assetList';
import { useRouter } from 'next/router';
import AssetVariationsApp from '@/app/configurations/asset/variations';
import { useQuery, useMutation } from '@apollo/client';
import { GET_SPEC_ASSET } from '@graphql/operations/asset/assetQueries';
import _, { isEmpty } from 'lodash';
import Spinner from '@/components/ui/loaders/spinner/spinner';
import VariationFormApp from '@/app/configurations/asset/variations/form';

type Props = {}


const AssetViewVarIndex: NextPageWithLayout = () => {
    const { query } = useRouter();
    const { searchType, assetId, ...restQuery } = query;
    

    const breadcrumbs = [
        {
            title: 'Asset Origin',
            route: `${FrontPath.ASSET_VARIATIONS_VIEW}/${assetId}`,
            isHome: true,
        },
        {
            title: 'Create',
            route: '#',
            isCurrent: true,
        },
    ];

    const { data: specAss, refetch } = useQuery(GET_SPEC_ASSET, {
        variables: {
            id: assetId
        },
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
    });



    return (
        <>
            <ModClassicLayout breadcrumb={breadcrumbs}>
                {/* <div className='pt-2'>
                 { (!isEmpty(specAss) && _.get(specAss, "asset.data") ) ?  <AssetVariationsApp assetData={_.get(specAss, "asset.data")} /> : <Spinner/>}
                </div> */}
                <>
                    <VariationFormApp assetId={assetId as string} />
                </>
            </ModClassicLayout>
        </>
    )
}
AssetViewVarIndex.getLayout = getLayout;

AssetViewVarIndex.authenticate = {
    permissions: adminOnly,
};

export default AssetViewVarIndex