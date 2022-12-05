import { CheckCircleIcon } from '@/components/icons/checkCirle-icon'
import { CircleCheckIcon } from '@/components/icons/circle-check-icon'
import { XCircleIcon } from '@/components/icons/xcircle-icon'
import BorderDashed from '@/components/ui/border'
import ABButton from '@/components/ui/buttons/ABbutton'
import _ from 'lodash'
import React from 'react'
import ReactTimeAgo from 'react-time-ago';
import Approving from '@/app/tickets/view/approving';
import ABDisplaySectionLabel from '@/components/customs/layouts/ABDisplaySectionLabel'

type Props = {
    data?: any;
    displayAll?: boolean;
    approvingAction?: any;
}

const ViewAssigs = ({ data, displayAll, approvingAction }: Props) => {

    return (
        <div className='font-sans'>
            <div className='grid grid-cols-2'>
                <ABDisplaySectionLabel>Signatories</ABDisplaySectionLabel>
                {/* <h1 className=" text-md font-extrabold text-gray-900 dark:text-white md:text-md ">Signatories</h1> */}
                {/* <div className='flex justify-end'>
                    <Approving displayAll={displayAll} action={approvingAction} />
                </div> */}
            </div>
            <div className='pt-2'>
                <div className=' grid grid-flow-col auto-cols-max gap-2'>
                    {
                        data && data.map((item: any) => (
                            <>
                                <div className={
                                    `w-fit p-1 px-3  rounded  grid grid-cols-1  text-sm font-bold flex
                                    ${item?.status == 'pending' ? "bg-sky-300 text-sky-900" : ""}
                                    ${item?.status == 'approved' ? "bg-green-300 text-green-900" : ""}
                                    ${item?.status == 'disapproved' ? "bg-rose-300 text-rose-900" : ""}
                                    `
                                }>
                                    <span className='text-[.60rem]'>
                                        {item.updatedAt &&
                                            <>{item?.status == "approved" ? "Approved" : (item?.status == "disapproved" ? "Disapproved" : "Updated")} <ReactTimeAgo date={item.updatedAt} locale="en-US" /></>}
                                    </span>
                                    <div className='flex '>
                                        <span className='capitalize grid content-center'>  {_.get(item, "user.firstName")},  {_.get(item, "user.lastName")} </span>
                                        <div className='grid content-center'><span className='font-bold  scale-75 '> [{_.get(item, "user.departmentOnDuty.name")}]</span></div>
                                        {/* text-[.70rem] */}
                                    </div>

                                </div>
                            </>

                        ))
                    }
                </div>
                {/* <div className='flex py-1'>
                            <div className='pt-1'>
                                <div className={`w-4 h-4 ${item?.status == "disapproved" ? 'bg-red-600' :
                                    (
                                        item?.status == "pending" ? "bg-slate-100" :
                                            (item?.status == "approved" ? "bg-green-600" : "")
                                    )

                                    } rounded-full`}></div>
                            </div>
                            <div className='pl-2'>
                              <span className='font-normal text-gray-600'> {_.get(item, "user.firstName")},  {_.get(item, "user.lastName")} </span> | <span className='font-thin italic'> {_.get(item, "user.departmentOnDuty.name")}</span>
                            </div>
                            
                        </div> */}
            </div>
        </div>
    )
}
export default ViewAssigs