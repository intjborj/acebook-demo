import { Image } from '@/components/ui/image';
import { motion } from 'framer-motion';
import { siteSettings } from '@/settings/site';
import Counter from '@/components/ui/counter';
import { CloseIcon } from '@/components/icons/close-icon';
import { fadeInOut } from '@/lib/motion/fade-in-out';
import usePrice from '@/lib/use-price';
import { useTranslation } from 'next-i18next';
import { useCart } from '@/store/quick-cart/cart.context';
import ReactTimeAgo from 'react-time-ago';
import { UPSERT_NOTIFICATION } from '@graphql/operations/notification/notificationMutations';
import { getAuthCredentials } from '@/utils/auth-utils';
import moment from 'moment';
import {  useMutation } from '@apollo/client';
import NotifTags from './notif-tags';
import React, { useState, useEffect } from 'react';

interface CartItemProps {
  item: any;
}

const NotifItem = ({ item }: CartItemProps) => {
  const { token, permissions, id, user } = getAuthCredentials();
  const [upsertNot] = useMutation(UPSERT_NOTIFICATION);
  const [itemList, setItemList] = useState<object[]>([])
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
            .then((resp) => {  })
            .catch((error) => { });
    }

}

useEffect(() => {
    if (item) {
        let payload: object[] = []
        if (item?.tags.length > 0) {
            payload = [...payload, ...item?.tags]
        }

        if (item?.ticketTypes.length > 0 && item?.ticketTypes[0].code) {
            payload = [...payload, ...item?.ticketTypes]
        }

        setItemList(payload)
    }
}, [item])
  
  return (
    <motion.div
      layout
      initial="from"
      animate="to"
      exit="from"
      variants={fadeInOut(0.25)}
      className="flex items-center py-4 px-4 sm:px-6 text-sm border-b border-solid border-border-200 border-opacity-75"
      onClick={()=>handleOpen(item)}
    >

      <div >
        <div className=' text-xs text-zinc-400 flex gap-1'>
          <ReactTimeAgo date={item.created_at} />
          {item?.views.length == 0 && <div className=' bg-blue-700 h-1 w-1 rounded-full '></div>}
        </div>
        <h3 className={`${item?.views.length == 0  ? 'font-bold' : 'font-medium'} text-heading`}>{item.message} </h3>
        <NotifTags tagList={itemList} />
      </div>

    </motion.div>
  );
};

export default NotifItem;
