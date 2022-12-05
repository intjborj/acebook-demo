import { Tickets } from '@/components/icons/category'
import Card from '@/components/ui/cards/card'
import Link from 'next/link'
import React from 'react'
import { useQuery } from '@apollo/client';
import { GET_POLL_DETAILS_LIST } from '@graphql/operations/investors/investorsQueries';
import _ from 'lodash';
import HeaderDetails from '@/components/ui/headers/header-details';
import { CircleCheckIcon } from '@/components/icons/circle-check-icon';
import { CircleCheckFillIcon } from '@/components/icons/circle-check-icon-fill';

type Props = {}

const PollDetailsIndex = (props: Props) => {

    const { data: dataList, refetch } = useQuery(GET_POLL_DETAILS_LIST, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
    });

    return (
        <div className='flex justify-center'>
            <div className='w-full md:w-3/6'>

                <HeaderDetails
                    title={'BOD Term Period'}
                    buttonName={'+ New term'}
                    buttonRoute={'/investors/configuration/pollperiod'}
                    showSearch={false}
                />
                {
                    _.get(dataList, "pollDetails.data") && _.get(dataList, "pollDetails.data").map((item: any) => (
                        <Link href={`/investors/configuration/pollperiod/${item._id}`}>
                            <Card className='w-full md:w-full cursor-pointer flex mb-2'>
                                {item.period}

                                {item.isCurrentTerm &&
                                    <div className=' w-5 pl-1 text-teal-900'>
                                        <CircleCheckFillIcon />
                                    </div>
                                }

                            </Card>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default PollDetailsIndex