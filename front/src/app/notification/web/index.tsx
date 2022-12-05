import React, { useState, useEffect, useMemo } from 'react'
import { Menu } from '@headlessui/react';
import { BellIcon } from '@/components/icons/bell-icon';
import { useQuery, useSubscription } from '@apollo/client';
import { GET_NOTIFS_COUNT, GET_NOTIFS_SPEC } from '@graphql/operations/notification/notificationQueries';
import { SUBS_NOTIFICATION_COUNT } from '@graphql/operations/notification/notificationSubscription';
import _ from 'lodash';
import CircleBadge from '@/components/ui/badge/CircleBadge';
import { getAuthCredentials } from '@/utils/auth-utils';
import NotifList from './notifList';
import useSound from 'use-sound';
import { NOTIFICATION_SOUND } from '@/constants/sounds';
import { useNotifCount } from '@/hooks/useNotifCount';
// import notificationMixkit from '@/assets/sounds/notificationmixkit.wav';

type Props = {}
type StateType = {
    notifCount: number | null;
    dropVisibility: boolean
}

const NotifDropdownWeb: React.FC<{ minimal?: boolean }> = ({ minimal }) => {
    const { token, permissions, id, user } = getAuthCredentials();
    const hookNotifCount = useNotifCount()
    // const [play] = useSound(notificationMixkit);
//   const [play] = useSound(
//        NOTIFICATION_SOUND,
//         { volume: 0.5 }
//       );
 
//     const [state, setState] = useState<StateType>({
//         notifCount: null,
//         dropVisibility: false
//     })

    const { data: allNotifs, refetch:refecthAllNotifs } = useQuery(GET_NOTIFS_SPEC, {
        variables: {
            userId: _.get(user, "_id"),
            departmentId: _.get(user, "departmentOnDuty._id"),
        },
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
    });


    // const { data: subsData, loading, error } = useSubscription(
    //     SUBS_NOTIFICATION_COUNT,
    //     {
    //         variables: {
    //             "userId": _.get(user, '_id'),
    //             "departmentId": _.get(user, 'departmentOnDuty._id')
    //         }
    //     }
    // );


    // const { data: notifCount, refetch: refetchCount } = useQuery(GET_NOTIFS_COUNT, {
    //     variables: {
    //         userId: _.get(user, "_id"),
    //         departmentId: _.get(user, "departmentOnDuty._id"),
    //     },
    //     fetchPolicy: 'cache-and-network',
    //     nextFetchPolicy: 'cache-first',
    // });



    // useMemo(() => {
    //     if (_.get(notifCount, "notificationCount.data.notViewed")) {
    //         setState((p) => ({ ...p, notifCount: _.get(notifCount, "notificationCount.data.notViewed") }))
    //     }
    // }, [notifCount])

    // useMemo(() => {
    //     if (subsData) {
    //         setState((p) => ({ ...p, notifCount: (state.notifCount ?? 0) + parseInt(_.get(subsData, "subscNotifCount.notViewed")) }))
    //         play()
    //     }
    // }, [subsData])

   

    return (

        <Menu
            as="div"
            className="relative inline-block ltr:text-left rtl:text-right"
            
        >
            <div className='flex gap-2'>
                <Menu.Button className="flex items-center focus:outline-none">
                    <div className='w-8 cursor-pointer text-neutral-500 pt-1' onClick={()=>{
                        refecthAllNotifs()
                        }}>
                        <BellIcon />
                        {(hookNotifCount && hookNotifCount > 0) ?
                        // {(state.notifCount && state.notifCount > 0) ?
                            <CircleBadge content={ hookNotifCount > 99 ? `99+` : hookNotifCount} />
                            // <CircleBadge content={hookNotifCount} />
                            // <CircleBadge content={state.notifCount} />
                            : <></>}
                    </div>
                </Menu.Button>
            </div>

            <NotifList minimal={minimal} allNotifs={allNotifs} />
        </Menu>
    )
}

export default NotifDropdownWeb