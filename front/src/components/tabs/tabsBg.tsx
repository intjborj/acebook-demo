import { TabMenuType } from '@/types/custom';
import React, { useState } from 'react'

type Props = {
    action?: any;
    menu?: any;
    currentTab?: string;
}





const TabsBg = ({ action, menu, currentTab }: Props) => {

    const [current, setCurrent] = useState<string>(currentTab as string)

    return (
        <div className='pb-5'>
            <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                {
                    menu && <>
                        {
                            menu.map((item: TabMenuType) => (

                                <li className="mr-2">
                                    <a href="#"
                                        onClick={() => {
                                            action ? action(item.fetchCode) : {}
                                            setCurrent(item.name as string)
                                        }}
                                        className={`
                                    ${current === item.name ? 'text-teal-600 bg-gray-300 active' : ''}
                                    ${current === item.name ? '' : 'hover:text-gray-600 hover:bg-gray-50'}
                                    inline-block
                                    p-3
                                    rounded-t-lg
                                    dark:hover:bg-gray-800
                                    dark:hover:text-gray-300
                                    `}>
                                        {item.label}
                                       { (item.count as any > 0 ) && <span className="inline-flex justify-center items-center ml-2 w-4 h-4 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
                                            {item.count} 
                                        </span>}
                                    </a>
                                </li>
                            ))
                        }
                    </>
                }


                {/* <li className="mr-2">
                    <a href="#"
                    //  onClick={e => refetch({
                    //     type: null,
                    //     userId: null
                    // })} 
                    aria-current="page" className="inline-block p-3 text-teal-600 bg-gray-300 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500">All</a>
                </li>
                <li className="mr-2">
                    <a href="#"
                        // onClick={e => refetch({
                        //     type: "FOR_APPROVAL",
                        //     userId: _.get(user, "_id")
                        // })}
                        className="inline-block p-3 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">My Approvals</a>
                </li>
                <li className="mr-2">
                    <a href="#" className="inline-block p-3 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Approved</a>
                </li> */}
            </ul>
        </div>
    )
}

export default TabsBg