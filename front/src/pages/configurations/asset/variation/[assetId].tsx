import React, { useState } from 'react'
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
import { GET_SPEC_ASSET, GET_ASSET_VARIATIONS } from '@graphql/operations/asset/assetQueries';
import _, { isEmpty } from 'lodash';
import Spinner from '@/components/ui/loaders/spinner/spinner';

type Props = {}
type StateType = {
    searchArgs: { isSearch?: boolean, description?: string } | null
}
const breadcrumbs = [
    {
        title: 'Assets',
        route: FrontPath.ASSET_LIST,
        isHome: true,
    },
    {
        title: 'View',
        route: '#',
        isCurrent: true,
    },
];

const dataPerPage = 20
const AssetViewVarIndex: NextPageWithLayout = () => {
    const { query } = useRouter();
    const { searchType, assetId, ...restQuery } = query;
    const [state, setState] = useState<StateType>({ searchArgs: null })


    const { data: specAss, refetch } = useQuery(GET_SPEC_ASSET, {
        variables: {
            id: assetId
        },
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
    });
    let queryPayload: any = {
        "perPage": dataPerPage,
        "page": 1,
        "asset": assetId,
        "searchArg": null
    }

    //   {
    //     "perPage": dataPerPage,
    //     "page": 1,
    //     "asset": assetId,
    //     "searchArg": {
    //       "description": null,
    //       "isSearch": null
    //     }
    //   }
    const { data: assVar, refetch: refetchVar } = useQuery(GET_ASSET_VARIATIONS, {
        variables: queryPayload,
        fetchPolicy: 'network-only',
        // nextFetchPolicy: 'cache-first',
    });


    const getSearchInput = (data: any) => {
        if (data.searchText && data.searchText != '') {
            let search = {
                "isSearch": true,
                "description": data?.searchText
            }

            let payload = _.cloneDeep(queryPayload)
            payload.searchArg = search

            setState((p) => ({ ...p, searchArgs: search }))
            refetchVar(payload)
        } else {
            setState((p) => ({ ...p, searchArgs: null }))
            refetchVar(queryPayload)
        }
    }

    const pageChange = (page: number) => {

        refetchVar({
            searchArg: state.searchArgs,
            perPage: dataPerPage,
            page: page,
        })
    }



    return (
        <>
            <ModClassicLayout breadcrumb={breadcrumbs}>
                <div className='pt-2'>
                    {(!isEmpty(assVar) && _.get(assVar, "assetVariations.assetData")) ?
                        <AssetVariationsApp
                            pageChange={pageChange}
                            paginationInfo={_.get(assVar, "assetVariations.paginatorInfo")}
                            getSearchInput={getSearchInput}
                            assetData={_.get(assVar, "assetVariations.assetData")}
                            variations={_.get(assVar, "assetVariations.data")}
                            refetch={refetchVar}
                        />
                        : <Spinner />}
                    {/* {(!isEmpty(specAss) && _.get(specAss, "asset.data")) ? <AssetVariationsApp assetData={_.get(specAss, "asset.data")} /> : <Spinner />} */}
                </div>
            </ModClassicLayout>
        </>
    )
}
AssetViewVarIndex.getLayout = getLayout;

AssetViewVarIndex.authenticate = {
    permissions: adminOnly,
};

export default AssetViewVarIndex