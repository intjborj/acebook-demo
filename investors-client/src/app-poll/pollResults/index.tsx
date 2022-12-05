import React, {useEffect} from 'react'
import PollContainer from '../components/layouts/pollContainer'
import { useQuery } from '@apollo/client';
import { GET_CURRENT_TERM, GET_POLL_RESULTS } from '@graphql/investors/investorsQueries';
import _ from 'lodash';
import PollResultContent from './pollResultContent';


type Props = {}

const PollResultsIndex = (props: Props) => {

    const { data: dataTerm } = useQuery(GET_CURRENT_TERM, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
    });




    // useEffect(() => {
    //         if(dataTerm && dataPoll){
    //             console.log("")
    //         }
    // }, [dataTerm && dataPoll])
    



    return (
        <div>
            <PollContainer period={_.get(dataTerm, "pollCurrentTerm.data[0].period")}>
                <>
                   {_.get(dataTerm, `pollCurrentTerm.data[0]._id`) && <PollResultContent  termId={_.get(dataTerm, `pollCurrentTerm.data[0]._id`)}/>}
                </>
            </PollContainer>
        </div>
    )
}

export default PollResultsIndex