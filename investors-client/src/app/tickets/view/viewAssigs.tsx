import { CheckCircleIcon } from '@/components/icons/checkCirle-icon'
import { CircleCheckIcon } from '@/components/icons/circle-check-icon'
import { XCircleIcon } from '@/components/icons/xcircle-icon'
import BorderDashed from '@/components/ui/border'
import _ from 'lodash'
import React from 'react'

type Props = {
    data?: any;
}

const ViewAssigs = ({ data }: Props) => {
    


    return (
        <div className='font-sans'>
            <BorderDashed />
            <div className='py-3 font-bold'>Assignatories</div>
            <div>

                {
                    data.map((item: any) => (
                        <div className='flex py-1'>
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
                        </div>

                    ))
                }
            </div>

        </div>
    )
}
export default ViewAssigs