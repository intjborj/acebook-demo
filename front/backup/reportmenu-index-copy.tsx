import { useState } from 'react'
import { Tab } from '@headlessui/react'
// import TicketReportDropdown, { IconOne, IconThree, IconTwo } from './ticketReportDropdown';

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

type Props = {
    action?: any;
    menu?: MenuAttType[];
}

export type MenuAttType = {
    router?: string;
    name?: string;
    restriction?: string;
    count?: number;
    fetchCode?: string;
    isDropdown?: boolean;
}

// const solutions = [

//     {
//         name: 'My Approved Tickets',
//         href: '##',
//         icon: IconOne,
//     },
//     {
//         name: 'Assigned Tickets',
//         href: '##',
//         icon: IconTwo,
//     },
//     {
//         name: 'Created Tickets',
//         href: '##',
//         icon: IconThree,
//     },
//     {
//         name: 'Department Service Tickets',
//         href: '##',
//         icon: IconOne,
//     },
//     {
//         name: 'Department Ticket Requests',
//         href: '##',
//         icon: IconTwo,
//     },
//     {
//         name: 'Marked Received Works',
//         href: '##',
//         icon: IconThree,
//     },


// ]



// export default function ReportMenu({ action, menu }: Props) {


//     return (
//         <div className="w-full  px-2 py-2 sm:px-0">
//             {/* <div className="w-full max-w-md px-2 py-2 sm:px-0"> */}
//             <Tab.Group>
//                 <Tab.List className="flex space-x-1 rounded-xl bg-teal-900/20 p-1 ">
//                     {menu && menu.map((item: MenuAttType, index: number) => (
//                         <TicketReportDropdown hasPopover={item.isDropdown ? true : false} menu={solutions}>
//                             <Tab
//                                 key={index}
//                                 className={({ selected }) =>
//                                     classNames(
//                                         'w-full relative  rounded-lg py-2.5 text-xs md:text-sm font-medium leading-5 text-teal-800 ',
//                                         //   'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
//                                         'focus:outline-none ',

//                                         selected
//                                             ? 'bg-white shadow'
//                                             : 'text-teal-600  bg-white/[0.30] hover:bg-white/[0.40] hover:text-teal-700 '
//                                     )
//                                 }
//                                 onClick={() => {
//                                     item.isDropdown ? {} : (action ? action(item.fetchCode) : {})
//                                 }}
//                             >

//                                 <span>
//                                     {(item.count as any > 0) && <span className="right-[.2rem] top-[.2rem] absolute inline-flex justify-center items-center ml-2 w-4 h-4 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
//                                         {item.count}
//                                     </span>}
//                                     {item.name}
//                                 </span>


//                             </Tab>
//                         </TicketReportDropdown>
//                     ))}

//                 </Tab.List>

//             </Tab.Group>
//         </div>
//     )
// }
