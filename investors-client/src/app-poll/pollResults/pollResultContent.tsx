import React, { useState, useEffect } from 'react'
import { useQuery,useSubscription } from '@apollo/client';
import { GET_CURRENT_TERM, GET_EST_VOTES, GET_POLL_RESULTS } from '@graphql/investors/investorsQueries';
import { GET_REALTIME_RESULTS} from '@graphql/investors/invetorsSubscriptions';
import _ from 'lodash';
import Spinner from '@/components/ui/loaders/spinner/spinner';
import ResultCandidates from './resultCandidates';


type Props = {
    termId?: string
}

type StateType = {
    candidates?: any
    resultLoading?: boolean;
}

const PollResultContent = ({ termId }: Props) => {
    const [state, setState] = useState<StateType>({
        candidates: [],
        resultLoading: true
    })

    const { data: dataPoll } = useQuery(GET_POLL_RESULTS, {
        variables: {
            id: termId
        },
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
    });

    const { data: totalVotes } = useQuery(GET_EST_VOTES, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
    });

    const { data: subResult, loading, error } = useSubscription(
        GET_REALTIME_RESULTS
    );

   
    useEffect(() => {
        if (dataPoll) {
            setState((p) => ({ ...p, candidates: _.get(dataPoll, "voteResult.data"), resultLoading: false }))
        }

    }, [dataPoll])

    useEffect(() => {
        if (subResult) {
            setState((p) => ({ ...p, candidates: _.get(subResult, "subscBodPollResult.data") }))
        }

    }, [subResult])

 


    return (
        <div>
            {
                state.resultLoading ? <Spinner /> : <>
                    {
                      _.orderBy(state.candidates,"totalVotes", "desc")  .map((item: any) => (
                            <ResultCandidates data={item} totalVotesRef={ _.get(totalVotes, "getTotalVotes.totalVotes")} />
                        ))
                    }
                </>
            }
        </div>
    )
}

export default PollResultContent