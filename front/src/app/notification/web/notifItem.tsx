import React, { useState, useEffect } from 'react';
import { Menu, Transition } from '@headlessui/react';
import cn from 'classnames';
import _ from 'lodash';
import ReactTimeAgo from 'react-time-ago';
import NotifTags from '@/components/notification/notif-tags';

type Props = {
    item?: any;
    handleOpen?: any;
}

const NotifItem = ({ item, handleOpen }: Props) => {

    const [itemList, setItemList] = useState<object[]>([])

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
        <Menu.Item >
            {/* {({ active }) => ( */}
            <li>
                <button
                    onClick={() => handleOpen(item)}
                    className={cn(
                        'block w-full py-2.5 px-6 text-sm font-semibold  text-heading transition duration-200 hover:text-accent focus:outline-none ltr:text-left rtl:text-right',
                        'text-heading'
                        // active ? 'text-accent' : 'text-heading'
                    )}
                >
                    {/* <Link href={item.path}> */}
                    <div className='flex flex-col'>
                        <div className=' text-xs text-zinc-400 flex gap-1'>
                            <ReactTimeAgo date={item.created_at} />
                            {item?.views.length == 0 && <div className=' bg-blue-700 h-1 w-1 rounded-full '></div>}
                        </div>
                        {/* <div className={`${item?.views.length ? '' : 'text-blue-600'}`}>
                            {item.message}
                        </div> */}
                         <h3 className={`${item?.views.length == 0  ? 'font-bold' : 'font-medium'} text-heading`}>{item.message} </h3>

                    </div>
                    <div>
                        <NotifTags tagList={itemList}/>
                    </div>
                    {/* </Link> */}
                </button>
            </li>
            {/* )} */}
        </Menu.Item>
    )
}

export default NotifItem