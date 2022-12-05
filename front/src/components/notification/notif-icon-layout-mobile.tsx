import React, { useState, useEffect } from 'react'
import { BellIconNav } from '../icons/bell-icon-nav'
import { Menu } from '@headlessui/react';
import { BellIcon } from '@/components/icons/bell-icon';
import { useQuery, useSubscription } from '@apollo/client';
import { GET_NOTIFS_COUNT, GET_NOTIFS_SPEC } from '@graphql/operations/notification/notificationQueries';
import { SUBS_NOTIFICATION_COUNT } from '@graphql/operations/notification/notificationSubscription';
import _ from 'lodash';
import CircleBadge from '@/components/ui/badge/CircleBadge';
import { getAuthCredentials } from '@/utils/auth-utils';
import useSound from 'use-sound';
import { NOTIFICATION_SOUND } from '@/constants/sounds';
import { useNotifCount } from '@/hooks/useNotifCount';

type Props = {}

const NotifIconMobileLayout = (props: Props) => {
    const { token, permissions, id, user } = getAuthCredentials();
    const notifCount = useNotifCount()
    // const notifCount = useNotifCount()

    return (
        <div>
            <span className="sr-only">Notification</span>

            <div className='relative'>
                <BellIconNav />
                {(notifCount && notifCount > 0) ?
                    <div className=' absolute top-0 right-2'>
                        <CircleBadge content={notifCount > 99 ? `99+` : notifCount} />
                    </div>
                    : <></>}
            </div>
        </div>
    )
}

export default NotifIconMobileLayout