import { useQuery } from '@apollo/client';
import { SEARCH_ACCS } from '@graphql/operations/accounts/accountQueries';
import _ from 'lodash';

type Props = {
    search?: (data: string) => void
}

export const useUserSearch = () => {
    const { data: searchedUser, refetch: refectUsSearch } = useQuery(SEARCH_ACCS, {
        variables: {
            name: null
        },
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
    });



   const search = (data: any) => {
    
        if (data != null || data != undefined || data != " ") {
            setTimeout(function () {
                refectUsSearch({
                    name: data
                })
            }, 500);
        }
    }
   


    return {
        result: _.get(searchedUser, "search_accounts.data") ?? [],
        search: search
    }
}   