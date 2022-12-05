import React, { useState, useEffect } from 'react'
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { BellIcon } from '@/components/icons/bell-icon';
import cn from 'classnames';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import { GET_NOTIFS_COUNT, GET_NOTIFS_SPEC } from '@graphql/operations/notification/notificationQueries';
import { SUBS_NOTIFICATION_COUNT } from '@graphql/operations/notification/notificationSubscription';
import { UPSERT_NOTIFICATION } from '@graphql/operations/notification/notificationMutations';
import _ from 'lodash';
import ReactTimeAgo from 'react-time-ago';
import CircleBadge from '@/components/ui/badge/CircleBadge';
import { getAuthCredentials } from '@/utils/auth-utils';
import Link from 'next/link';
import moment from 'moment';
import { set } from 'react-hook-form';
import NotifItem from './notifItem';

type Props = {
    allNotifs?: any;
    minimal?: any;
}

const NotifList = ({ allNotifs, minimal }: Props) => {

    const { token, permissions, id, user } = getAuthCredentials();
    const [upsertNot] = useMutation(UPSERT_NOTIFICATION);

    const handleOpen = (item: any) => {

        window.open(item.path, '_self')
        if (item?.views.length == 0) {
            upsertNot({
                variables: {
                    input: {
                        _id: item._id,
                        views: {
                            user: id,
                            viewDate: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
                        }
                    },
                },
            })
                .then((resp) => { })
                .catch((error) => { });
        }

    }

  

    return (
        <div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items
                    as="ul"
                    className={cn(
                        'absolute  scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-slate-100 overflow-y-scroll min-h-fit h-96 mt-1 w-96 rounded bg-white pb-4 shadow-700 focus:outline-none ltr:right-0 ltr:origin-top-right rtl:left-0 rtl:origin-top-left',
                        {
                            '!mt-2': minimal,
                        }
                    )}
                >
                    {/* _.get(allNotifs, "notifSpec.data") */}
                    {_.get(allNotifs, "notifSpec.data") && _.get(allNotifs, "notifSpec.data").length > 0 ? <>

                        {_.orderBy(_.get(allNotifs, "notifSpec.data"), ['created_at'], ['desc', 'asc']).map((item: any, index:number) => (
                            <div key={index}>
                                <NotifItem item={item} handleOpen={handleOpen} />
                            </div>
                        ))
                        }
                    </>
                        :
                        <div className=' text-slate-400 flex justify-center pt-20 '>
                            No notifications to display
                        </div>
                    }


                </Menu.Items>
            </Transition>

        </div>
    )
}

export default NotifList