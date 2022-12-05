import ABCardDataLayout from '@/components/customs/layouts/ABCardDataLayout'
import { AccountConfigType } from '@/types/accounts/accountTypes'
import React from 'react'
import { useQuery, useLazyQuery } from '@apollo/client';
import NotifConfig from './notifConifg'
import { GET_SPEC_USER, GET_SPEC_USER_CONFIG } from '@graphql/operations/accounts/accountQueries';
import { useGetUser } from '@/hooks/useGetUser';
import _ from 'lodash';
import ABTransition from '@/components/customs/transitions/ABTransition';

export const AccConfigContext = React.createContext<AccountConfigType>({})
type Props = {}

const AccountConfigurations = (props: Props) => {

    const { result } = useGetUser({ query: GET_SPEC_USER_CONFIG })

    return (
        <ABCardDataLayout>
            {(result && _.get(result, "configurations.notification")) &&
                <ABTransition>
                    <AccConfigContext.Provider value={{ notification: _.get(result, "configurations.notification") }} >
                        <NotifConfig />
                    </AccConfigContext.Provider>
                </ABTransition>
            }
        </ABCardDataLayout>
    )
}

export default AccountConfigurations