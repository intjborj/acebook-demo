
import Card from '@/components/ui/cards/card'
import React, { useEffect, useState } from 'react'
import { GET_CURRENT_TERM, GET_INVESTOR_CONFIG } from '@graphql/investors/investorsQueries';
import PollHead from '@/app-poll/components/layouts/pollHead';
import _ from 'lodash';
import PollVotesAvailable from './pollVotesAvailable';
import PollCandidates from './candidates/pollCandidates';
import { GET_DETAILED_ACC, GET_NONDETAILED_ACC } from '@graphql/operations/accounts/accountQueries';
import { getAuthCredentials } from "@utils/auth-utils";
import Spinner from '@/components/ui/loaders/spinner/spinner';
import { VotedType } from '../types/pollTypes';
import { toast } from 'react-toastify';
import { POLL_ERROR_REACHED } from '../constants/poll';
import { useMutation, useSubscription, useQuery } from '@apollo/client';
import { PROCESS_VOTE } from '@graphql/investors/invetorsMutations';
import PollContainer from '@/app-poll/components/layouts/pollContainer';
import Image from 'next/image';
import { GET_REALTIME_POLL_DETS } from '@graphql/investors/invetorsSubscriptions';

type Props = {

}
type StateType = {
    pollLoading?: boolean;
    votesAvailable: number;
    votesAvailableOrg: number;
    candidates?: any;
    reachLimit?: boolean;
    hasVoted?: boolean;
    votingOpen?: boolean;
}

const PollLayout = (props: Props) => {
    const { id: cookieUserId } = getAuthCredentials();
    const [state, setState] = useState<StateType>({
        pollLoading: true,
        votesAvailable: 0,
        votesAvailableOrg: 0,
        candidates: [],
        reachLimit: false,
        hasVoted: false,
        votingOpen: true
    })
    const initialPath = "pollCurrentTerm.data[0]"
    const [processVote] = useMutation(PROCESS_VOTE);

    const { data: dataPoll, loading } = useQuery(GET_CURRENT_TERM, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
    });

    const { data: subPollDetails, error } = useSubscription(
        GET_REALTIME_POLL_DETS
    );

    const { data: dataPollConfig, loading: configLoading } = useQuery(GET_INVESTOR_CONFIG, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
    });

    const { data: accData, refetch: refecthAcc } = useQuery(GET_NONDETAILED_ACC, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
        variables: {
            "first": 1,
            "page": 1,
            "id": cookieUserId,
            "type": "SPECIFIC_ID"
        }
    });



    function calculateVotes(block: number) {

        const sharesPerBlock = _.get(dataPollConfig, "compConfigs.data[0].investor.sharesPerBlock")
        const votesPerShare = _.get(dataPollConfig, "compConfigs.data[0].investor.votesPerShare")

        if (block && sharesPerBlock && votesPerShare) {
            let shares = block * sharesPerBlock;
            let votes = shares * votesPerShare;

            return votes
        } else {
            return 0
        }
    }

    useEffect(() => {
        if (dataPollConfig && accData && dataPoll) {
            let votesNum = calculateVotes(_.get(accData, "accounts.data[0].investorDetails.blocks"));
            let checkVoted = _.get(accData, "accounts.data[0].investorDetails.votingHistory") ? _.get(accData, "accounts.data[0].investorDetails.votingHistory").includes(_.get(dataPoll, `${initialPath}._id`)) : false
            // console.log("checkVoted", checkVoted)

            setState((p) => ({
                ...p,
                pollLoading: false,
                votesAvailable: votesNum,
                votesAvailableOrg: votesNum,
                candidates: _.get(dataPoll, `${initialPath}.candidates`),
                hasVoted: checkVoted,
                votingOpen: _.get(dataPoll, "pollCurrentTerm.data[0].votingOpen")
            }))
        }
    }, [dataPollConfig && accData && dataPoll])

    useEffect(() => {
        if (subPollDetails) {
         
            setState((p) => ({
                ...p,
                votingOpen: _.get(subPollDetails, "subscPollDetails.data[0].votingOpen")
            }))
        }
    }, [subPollDetails])


    useEffect(() => {
        if (accData) {
            let checkVoted = _.get(accData, "accounts.data[0].investorDetails.votingHistory") ? _.get(accData, "accounts.data[0].investorDetails.votingHistory").includes(_.get(dataPoll, `${initialPath}._id`)) : false

            setState((p) => ({
                ...p,
                hasVoted: checkVoted
            }))

        }
    }, [accData])



    const handleVote = (data: VotedType) => {

        let selectedCandidate = data.candidate
        let newVotes = 0

        let newCandidates = state.candidates.map((item: any) => {
            let duplicate = _.cloneDeep(item)

            if (duplicate._id == selectedCandidate._id) {
                duplicate.vote = data.vote

            }
            if (duplicate.vote) {
                newVotes += duplicate.vote
            }
            return duplicate
        })
        let newVoteAvailable = state.votesAvailableOrg - newVotes
        if (newVoteAvailable >= 0) {
            setState((p) => ({ ...p, votesAvailable: newVoteAvailable, candidates: newCandidates, reachLimit: false }))
        } else {
            toast.error(POLL_ERROR_REACHED)
            setState((p) => ({ ...p, reachLimit: true }))
        }
    }

    const handleProcessVote = () => {


        let modCandidates = state.candidates.map((item: any) => {
            return {
                votes: {
                    user: item?.user?._id,
                    count: item?.vote
                },
                _id: item?._id
            }
        })

        let payload = {
            _id: _.get(dataPoll, `${initialPath}._id`),
            candidates: modCandidates,
            userId: cookieUserId
        }

        if (confirm('Please confirm vote submission. You can only vote once.')) {
            processVote({
                variables: {
                    input: payload,
                },
            })
                .then((resp) => {
                    toast.success('Vote sucessfully saved');
                    refecthAcc()
                })
                .catch((error) => {
                    toast.error('Failed to submit votes');
                });
        }
    }
   

    return (
        <PollContainer period={_.get(dataPoll, "pollCurrentTerm.data[0].period")}>
            {
                state.votingOpen ?
                    <>
                        {
                            state.pollLoading ? <Spinner /> :
                                <>
                                    {state.hasVoted == false ? <PollVotesAvailable data={state.votesAvailable} /> : <></>}
                                    <PollCandidates
                                        data={state.candidates}
                                        voted={handleVote}
                                        votesAvailable={state.votesAvailable}
                                        votesAvailableOrg={state.votesAvailableOrg}
                                        reachLimit={state.reachLimit}
                                        hasVoted={state.hasVoted}
                                    />
                                    {/* <PollCandidates data={_.get(dataPoll, `${initialPath}.candidates`)} voted={handleVote} /> */}
                                </>}

                        {state.hasVoted == false ? <div className=' flex justify-center'>
                            <button type="button" onClick={handleProcessVote} className=" w-3/6 text-white  bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-extrabold rounded-full text-cl px-5 py-2.5 text-center mr-2 mb-2">VOTE</button>
                        </div> : <></>}
                    </>
                    :
                    <>
                        <div className=" flex justify-center pt-10 ">

                            <h1 className="grid content-center mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">VOTING</span> Closed</h1>
                            <Image className='motion-safe:animate-pulse' src={'/voting-icon.png'} width={380} height={380} />
                        </div>
                    </>
            }
        </PollContainer>
    )
}

export default PollLayout