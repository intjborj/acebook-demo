import { useRouter } from 'next/router';
import { motion, AnimateSharedLayout } from 'framer-motion';
import EmptyCartIcon from '@/components/icons/empty-cart';
import { CloseIcon } from '@/components/icons/close-icon';
import { fadeInOut } from '@/lib/motion/fade-in-out';
import { useCart } from '@/store/quick-cart/cart.context';
import { formatString } from '@/lib/format-string';
import { useTranslation } from 'next-i18next';
import { useAtom } from 'jotai';
import { drawerAtom } from '@/store/drawer-atom';
import { useQuery, useSubscription } from '@apollo/client';
import { GET_NOTIFS_COUNT, GET_NOTIFS_SPEC } from '@graphql/operations/notification/notificationQueries';
import lod from 'lodash';
import { getAuthCredentials } from '@/utils/auth-utils';
import NotifItem from './notif-item';
import BellIconCustom from '../icons/bell-icon-nav-custom';
import React, { useState, useEffect, useMemo } from 'react';
import { useNotifCount } from '@/hooks/useNotifCount';
import NotifMobileData from './components/notif-mobile-data';
import Spinner from '../ui/loaders/spinner/spinner';
import SkeletonLoader from '@/components/ui/loaders/skeleton-loader'

const NotifSidebarView = () => {
  const { token, permissions, id, user } = getAuthCredentials();
  const { t } = useTranslation('common');
  const { items, totalUniqueItems, total } = useCart();
  const [_, closeSidebar] = useAtom(drawerAtom);
  const router = useRouter();
  const notifCount = useNotifCount()
  const [displayItems, setDisplayItems] = useState<boolean>(false)
  // const { data: allNotifs, refetch: refecthAllNotifs } = useQuery(GET_NOTIFS_SPEC, {
  //   variables: {
  //     userId: lod.get(user, "_id"),
  //     departmentId: lod.get(user, "departmentOnDuty._id"),
  //   },
  //   fetchPolicy: 'cache-and-network',
  //   nextFetchPolicy: 'cache-first',
  // });



  useMemo(() => {

    if (_.display == true) {
      setTimeout(() => {
        setDisplayItems(true)
      }, 500);
    }

  }, [!_.display])


  return (
    <section className="flex flex-col h-full relative">
      {/* <Suspense fallback={
        <SkeletonLoader />
      }> */}
        <header className="fixed max-w-md w-full top-0 z-10 bg-light py-4 px-6 flex items-center justify-between border-b border-border-200 border-opacity-75">
          <div className="flex text-accent font-semibold">
            <BellIconCustom className="shrink-0" width={30} height={26} />
            <span className="flex ltr:ml-2 rtl:mr-2">
              {notifCount && <> {formatString(notifCount, "Unread Notification")}</>}
            </span>
          </div>
          <button
            onClick={() => closeSidebar({ display: false, view: '' })}
            className="w-7 h-7 ltr:ml-3 rtl:mr-3 ltr:-mr-2 rtl:-ml-2 flex items-center justify-center rounded-full text-muted bg-gray-100 transition-all duration-200 focus:outline-none hover:bg-accent focus:bg-accent hover:text-light focus:text-light"
          >
            <span className="sr-only">{t('text-close')}</span>
            <CloseIcon className="w-3 h-3" />
          </button>
        </header>
        {/* End of cart header */}

        <AnimateSharedLayout>
          {displayItems == true ? <NotifMobileData /> : <Spinner />}
          {/* <motion.div layout className="flex-grow pt-16 pb-20">
          {lod.get(allNotifs, "notifSpec.data") && lod.get(allNotifs, "notifSpec.data").length > 0 ? (
            // lod.orderBy(lod.get(allNotifs, "notifSpec.data"), ['created_at'], ['desc', 'asc']).map((item: any) => <NotifItem item={item} key={item._id} />)
            <NotifMobileData />
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
        </motion.div> */}
        </AnimateSharedLayout>
        {/* End of cart items */}

      {/* </Suspense> */}
    </section>
  );
};

export default NotifSidebarView;
