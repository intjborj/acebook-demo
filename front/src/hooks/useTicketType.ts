import { useQuery } from '@apollo/client';
import { GET_TICKET_TYPE } from '@graphql/operations/tickets/ticketQueries';
import _ from 'lodash';

export const useTicketType = () => {
    const { data: tikcetTypes } = useQuery(GET_TICKET_TYPE, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
    });
   


    return {
        result: _.get(tikcetTypes, "ticketTypes.data") ?? [],
    }
}   