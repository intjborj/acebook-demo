import { useQuery, useLazyQuery } from '@apollo/client';
import { SEARCH_ACCS } from '@graphql/operations/accounts/accountQueries';
import { SEARCH_ASSET } from '@graphql/operations/asset/assetQueries';
import _ from 'lodash';

type Props = {
    search?: (data: string) => void
}

export const useAssetSearch = () => {
    // const { data: searchedUser, refetch: refectUsSearch } = useQuery(SEARCH_ACCS, {
    //     variables: {
    //         name: null
    //     },
    //     fetchPolicy: 'cache-and-network',
    //     nextFetchPolicy: 'cache-first',
    // });

    const [getAsset, { error, data: dataAsset }] = useLazyQuery(SEARCH_ASSET);



   const search = (data: any) => {
    
        if (data != null || data != undefined || data != " ") {
            setTimeout(function () {
                getAsset({variables:{
                    text: data
                }})
            }, 500);
        }
    }



    return {
        result: _.get(dataAsset, "search_asset.data") ?? [],
        search: search
    }
}   