import React, { useEffect, useState } from 'react'
import type { NextPageWithLayout } from '@/types';
import { getLayout } from '@/components/layouts/layout';
import { adminOnly } from '@/utils/auth-utils';
import ModClassicLayout from '@/components/layouts/mod-classic';
import ManufacturerApp from '@/app/configurations/asset/manufacturer';
import AssManufacturerForm from '@/app/configurations/asset/manufacturer/form';
import { FrontPath } from '@/constants/enums/paths';
import AssetFormApp from '@/app/configurations/asset/assetList/form';
import { useRouter } from 'next/router';
import { useQuery, useMutation } from '@apollo/client';
import { GET_SPEC_ASSET } from '@graphql/operations/asset/assetQueries';
import { AssetType } from '@/types/assets/assetsType';
import _, { isEmpty } from 'lodash';
import Spinner from '@/components/ui/loaders/spinner/spinner';

type Props = {}

const breadcrumbs = [
    {
        title: 'Asset List',
        route: FrontPath.ASSET_LIST,
        isHome: true,
    },
    {
        title: 'Update',
        route: '#',
        isCurrent: true,
    },
];


const AssetFormUpdateIndex: NextPageWithLayout = () => {
    const { query } = useRouter();
    const { searchType, id: assId, ...restQuery } = query;
    const [defaultValue, setDefaultValue] = useState<AssetType>({})

    const { data: specAss, refetch } = useQuery(GET_SPEC_ASSET, {
        variables: {
            id: assId
        },
        fetchPolicy: 'network-only',
        // nextFetchPolicy: 'cache-first',
    });


    useEffect(() => {
        if (specAss) {
            let dataLoad = _.get(specAss, "asset.data")
            let defaults: AssetType = {
                name: dataLoad?.name,
                description: dataLoad?.description,
                count: dataLoad?.count,
                prefix: dataLoad?.prefix,
                handlingDepartment: dataLoad?.handlingDepartment,
                _id: dataLoad?._id
            }

            setDefaultValue(defaults)
        }
    }, [specAss])




    return (
        <>
            <ModClassicLayout breadcrumb={breadcrumbs}>
                <>
                    {(!isEmpty(specAss) && !isEmpty(defaultValue?._id)) ? <AssetFormApp defaultVals={defaultValue}/> : <Spinner />}
                    {/* <AssManufacturerForm /> */}
                </>
            </ModClassicLayout>
        </>
    )
}
AssetFormUpdateIndex.getLayout = getLayout;

AssetFormUpdateIndex.authenticate = {
    permissions: adminOnly,
};

export default AssetFormUpdateIndex