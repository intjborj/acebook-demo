import React from 'react'
import InvestorConfForm from './form'
import { useQuery } from '@apollo/client';
import { GET_INVESTOR_CONFIG } from '@graphql/operations/investors/investorsQueries';
import _ from 'lodash'

type Props = {}

const InvestorSetting = (props: Props) => {

    const { data: configData, refetch, loading } = useQuery(GET_INVESTOR_CONFIG, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
    });

  

  
  return (
    <div>{ _.get(configData, "compConfigs.data[0].investor") ? <InvestorConfForm defaultValues={_.get(configData, "compConfigs.data[0].investor")}/> : <></>}</div>
  )
}

export default InvestorSetting