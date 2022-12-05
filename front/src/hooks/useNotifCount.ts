import { useState, useEffect } from 'react';
import { useQuery, useSubscription } from '@apollo/client';
import { GET_NOTIFS_COUNT } from '@graphql/operations/notification/notificationQueries';
import { SUBS_NOTIFICATION_COUNT } from '@graphql/operations/notification/notificationSubscription';
import _ from 'lodash';
import { getAuthCredentials } from '@/utils/auth-utils';
import useSound from 'use-sound';
import { NOTIFICATION_SOUND } from '@/constants/sounds';


type StateType = {
    notifCount: number | null;
    dropVisibility: boolean
}


export function useNotifCount() {
    const { token, permissions, id, user } = getAuthCredentials();

    const [play] = useSound(
        NOTIFICATION_SOUND,
        { volume: 0.2 }
    );

    const [state, setState] = useState<StateType>({
        notifCount: null,
        dropVisibility: false
    })

    const { data: subsData, loading, error } = useSubscription(
        SUBS_NOTIFICATION_COUNT,
        {
            variables: {
                "userId": _.get(user, '_id'),
                "departmentId": _.get(user, 'departmentOnDuty._id')
            }
        }
    );


    const { data: notifCount, refetch: refetchCount } = useQuery(GET_NOTIFS_COUNT, {
        variables: {
            userId: _.get(user, "_id"),
            departmentId: _.get(user, "departmentOnDuty._id"),
        },
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
    });


    useEffect(() => {
        if (_.get(notifCount, "notificationCount.data.notViewed")) {
            setState((p) => ({ ...p, notifCount: _.get(notifCount, "notificationCount.data.notViewed") }))
        }
    }, [notifCount])

    useEffect(() => {
        if (subsData) {
            setState((p) => ({ ...p, notifCount: (state.notifCount ?? 0) + parseInt(_.get(subsData, "subscNotifCount.notViewed")) }))

            if (_.get(notifCount, "notificationCount.user.configurations.notification.isEnabled") ) {
                console.log("")
                play()
            }
        }
    }, [subsData])

    return state.notifCount
}