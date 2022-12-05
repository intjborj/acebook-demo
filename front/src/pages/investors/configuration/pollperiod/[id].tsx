import SpecInvPollDetail from '@/app/investors/configuration/pollDetails/candidates'
import React, { useEffect, useState } from 'react'
import ModClassicLayout from '@/components/layouts/mod-classic';
import { getLayout } from '@/components/layouts/layout';
import _ from 'lodash';
import { adminOnly } from '@/utils/auth-utils';
import InvConfigApp from '@/app/investors/configuration';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_SPEC_POLL_DETAILS } from '@graphql/operations/investors/investorsQueries';
import { extractFileBlob } from '@/services/extractions';

type Props = {}



const PollPeriodIndex = (props: Props) => {
    const { query } = useRouter();
    const { searchType, id, ...restQuery } = query;

    const [defaults, setDefaults] = useState<any>(null)
    const { data: dataList, refetch } = useQuery(GET_SPEC_POLL_DETAILS, {
        variables: {
            id: id
        },
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
    });



    useEffect(() => {
        if (dataList) {
          

            const fetchData = async () => {
                let dataload = _.get(dataList, "pollDetails.data[0]")
                let candidates = dataload?.candidates.map(async (item: any) => {

                    let duplicate = _.cloneDeep(item?.user)

                    let blobImage = extractFileBlob([{
                        path: item.thumbnail,
                        type: "investors"
                    }], "investors")

                    duplicate.customVoteCount = item.customVoteCount
                    duplicate.thumbnail = await blobImage
                    duplicate.candidateId = item._id
                    return duplicate
                })
              
                let defs = {
                    period: dataload?.period,
                    candidates: await Promise.all(candidates),
                    isCurrentTerm: dataload?.isCurrentTerm,
                    votingOpen: dataload?.votingOpen
                }
               

                setDefaults(defs)
            }

            fetchData()


        }
    }, [dataList])



    return (
        <ModClassicLayout>
            <>
                <SpecInvPollDetail defaults={defaults} id={id as string} />
            </>
        </ModClassicLayout>
    )
}
PollPeriodIndex.getLayout = getLayout;

PollPeriodIndex.authenticate = {
    permissions: adminOnly,
};
export default PollPeriodIndex