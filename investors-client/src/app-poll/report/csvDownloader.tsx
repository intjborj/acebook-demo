import { useQuery } from '@apollo/client';
import { POLL_REPORT } from '@graphql/investors/investorsQueries';
import React, { useEffect, useState } from 'react'
import CsvDownloader from 'react-csv-downloader';
import _ from 'lodash'
type Props = {
    termId?: string;
    termYear?: string;
}
type StateType = {
    restructData?: any;
}
const CsvPrepIndex = ({ termId, termYear }: Props) => {
    const [state, setState] = useState<StateType>({
        restructData: []
    })


    const { data: dataReport } = useQuery(POLL_REPORT, {
        variables: {
            id: termId
        },
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
    });



    useEffect(() => {
        if (dataReport) {
            let payload = _.get(dataReport, "PollReport.data").map((item: any) => {

                let remEmtCandidates = item.candidates.filter((item: any) => {
                    return item.votes.length > 0
                })
                let concatCandidates = ''
                let restructCandidates = remEmtCandidates.map((item: any) => {
                    concatCandidates += `(${item?.user?.firstName} ${item?.user?.lastName} : ${item.votes[0].count}) | `
                })

                return {
                    fullname: `${item?.firstName} ${item?.middleName} ${item?.lastName}`,
                    investorId: _.get(item, "investorDetails.investorId") ?? '',
                    certNo: _.get(item, "investorDetails.certNo") ?? '',
                    shares: _.get(item, "shares") ?? '',
                    votes: _.get(item, "votesAvailable") ?? '',
                    details: concatCandidates,
                }
            })

            setState((p) => ({ ...p, restructData: payload }))
        }
    }, [dataReport])





    const columns = [{
        id: 'fullname',
        displayName: 'Fullname'
    }, {
        id: 'investorId',
        displayName: 'ID Number'
    }, {
        id: 'certNo',
        displayName: 'Certificate Number'
    }, {
        id: 'shares',
        displayName: 'Shares'
    }, {
        id: 'votes',
        displayName: 'Votes Available'
    }, {
        id: 'details',
        displayName: 'Details'
    }];

    return (
        <div>

            <CsvDownloader
                filename={`ACE-ASM-${termYear}`}
                extension=".csv"
                // separator=","
                // wrapColumnChar="'"
                // newLineAtEnd={true}
                // meta={true}
                columns={columns}
                datas={state.restructData}
            >
                <div className="flex space-x-2 justify-center">
                    <div>
                        <button type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md focus:outline-none focus:ring-0 transition duration-150 ease-in-out pointer-events-none opacity-60" >Download Investor Details</button>
                    </div>
                </div>
            </CsvDownloader>
        </div>
    )
}

export default CsvPrepIndex