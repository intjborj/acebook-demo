import React, { useEffect, useState } from 'react'
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
import { GET_SPEC_ASSET, GET_SPEC_ASSET_VAR } from '@graphql/operations/asset/assetQueries';
import _, { isEmpty } from 'lodash';
import Spinner from '@/components/ui/loaders/spinner/spinner';
import VariationFormApp from '@/app/configurations/asset/variations/form';
import { AssetVariationFormType, AssetVariationViewType } from '@/types/assets/assetsType';

type Props = {}


const AssetViewVarIndex: NextPageWithLayout = () => {
    const { query } = useRouter();
    const { searchType, id, ...restQuery } = query;
    const [defaultVals, setDefaultVals] = useState<any>({})

    const breadcrumbs = [
        {
            title: 'Asset Origin',
            route: restQuery?.aid ? `${FrontPath.ASSET_VARIATIONS_VIEW}/${restQuery?.aid}` : '#',
            isHome: true,
        },
        {
            title: 'Update',
            route: '#',
            isCurrent: true,
        },
    ];

    const { data: specAssVar, refetch } = useQuery(GET_SPEC_ASSET_VAR, {
        variables: {
            id: id
        },
        fetchPolicy: 'network-only',
    });


    useEffect(() => {
        if (specAssVar) {
            let dataLoad: AssetVariationViewType = _.get(specAssVar, "assetVariation.data")
            let payload = {
                _id: dataLoad._id as string,
                asset: dataLoad.asset?._id as string,
                manufacturer: dataLoad?.manufacturer,
                model: dataLoad?.model,
                propertyCode: dataLoad?.propertyCode,
                serialNo: dataLoad?.serialNo,
                cost: dataLoad?.cost,
                condition: dataLoad?.condition,
                ipms: dataLoad?.ipms,
                description: dataLoad?.description,
                deployedDate: dataLoad?.deployedDate,
                supplier: dataLoad?.supplier,
            }
            setDefaultVals(payload)

        }
    }, [specAssVar])



    return (
        <>
            <ModClassicLayout breadcrumb={breadcrumbs}>
                {/* <div className='pt-2'>
                 { (!isEmpty(specAss) && _.get(specAss, "asset.data") ) ?  <AssetVariationsApp assetData={_.get(specAss, "asset.data")} /> : <Spinner/>}
                </div> */}
                <>
                    {(specAssVar && !isEmpty(defaultVals.asset)) && <VariationFormApp assetId={defaultVals?.asset as string} defaultVals={defaultVals} />}
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