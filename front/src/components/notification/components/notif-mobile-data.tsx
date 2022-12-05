import React from 'react'
import { useQuery, useSubscription } from '@apollo/client';
import _ from 'lodash';
import { getAuthCredentials } from '@/utils/auth-utils';
import { GET_NOTIFS_COUNT, GET_NOTIFS_SPEC } from '@graphql/operations/notification/notificationQueries';
import { motion, AnimateSharedLayout } from 'framer-motion';
import NotifItem from '@/components/notification/notif-item';
import { fadeInOut } from '@/lib/motion/fade-in-out';
import EmptyCartIcon from '@/components/icons/empty-cart';
import SkeletonLoader from '@/components/ui/loaders/skeleton-loader'
type Props = {}

const NotifMobileData = (props: Props) => {
    const { token, permissions, id, user } = getAuthCredentials();
    const { data: allNotifs, refetch: refecthAllNotifs } = useQuery(GET_NOTIFS_SPEC, {
        variables: {
            userId: _.get(user, "_id"),
            departmentId: _.get(user, "departmentOnDuty._id"),
        },
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
    });

    return (
        <div>
            {/* <Suspense fallback={
                <SkeletonLoader />
            }> */}
                <motion.div layout className="flex-grow pt-16 pb-20">
                    {_.get(allNotifs, "notifSpec.data") && _.get(allNotifs, "notifSpec.data").length > 0 ? (
                        _.orderBy(_.get(allNotifs, "notifSpec.data"), ['created_at'], ['desc', 'asc']).map((item: any) => <NotifItem item={item} key={item._id} />)
                        // <NotifMobileData />
                    ) : (
                        <motion.div
                            layout
                            initial="from"
                            animate="to"
                            exit="from"
                            variants={fadeInOut(0.25)}
                            className="h-full flex flex-col items-center justify-center"
                        >
                            <EmptyCartIcon width={140} height={176} />
                            <h4 className="mt-6 text-base font-semibold">
                                You have no Notifications
                            </h4>
                        </motion.div>
                    )}
                </motion.div>
            {/* </Suspense> */}
        </div>
    )
}

export default NotifMobileData