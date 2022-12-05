import React, { useEffect } from 'react'
import PollContainer from '../components/layouts/pollContainer'
import { useQuery } from '@apollo/client';
import { GET_CURRENT_TERM, GET_POLL_RESULTS, POLL_REPORT } from '@graphql/investors/investorsQueries';
import _ from 'lodash';

import CsvPrepIndex from './csvDownloader';


type Props = {}


const PollReport = (props: Props) => {

    const { data: dataTerm } = useQuery(GET_CURRENT_TERM, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
    });

    
    return (
        <div>
            <PollContainer period={_.get(dataTerm, "pollCurrentTerm.data[0].period")}>
                <>
               { _.get(dataTerm, "pollCurrentTerm.data[0]._id") && <CsvPrepIndex  termYear={_.get(dataTerm, "pollCurrentTerm.data[0].period")}  termId={_.get(dataTerm, "pollCurrentTerm.data[0]._id")}/>}
                </>
            </PollContainer>
        </div>
    )
}

export default PollReport