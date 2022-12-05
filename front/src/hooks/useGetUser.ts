import { getAuthCredentials } from '@/utils/auth-utils';
import { useQuery } from '@apollo/client';
import { DocumentNode } from '@apollo/client/core';
import { GET_SPEC_USER, SEARCH_ACCS } from '@graphql/operations/accounts/accountQueries';
import _ from 'lodash';

type Props = {
    query?:DocumentNode
}

export const useGetUser = ({query}:Props) => {
    const { id: userId, user } = getAuthCredentials();
    const { data: UserData } = useQuery(query ?? GET_SPEC_USER, {
        variables: {
            id: _.get(user, '_id'),
            type: "SPECIFIC_ID"
        },
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
    });

    return {
        result: _.get(UserData, "specAccount.data") ?? [],
    }
}   