import React, { useContext } from 'react'
import _ from 'lodash'
import LabelShort from '@/components/customs/labels/labelShort';
import MiniCont from '@/components/customs/labels/miniContent';
import { WorkViewContext } from '@/app/tickets/works/view';
import { getFirstLetters } from '@/services/getFirstLetters';

const AuthDetails = () => {
    const { workData, ticketData } = useContext(WorkViewContext) || {};
    return (

        <div className=' grid grid-cols-2'>
            <div>
                <LabelShort>Requesting Department</LabelShort>
                <MiniCont>{_.get(ticketData, "requestingDepartment.name")}</MiniCont>
                <LabelShort>Requested By</LabelShort>
                <MiniCont>{_.get(ticketData, "requestedBy.firstName")} {_.get(ticketData, "requestedBy.lastName")}</MiniCont>

            </div>
            <div>
                <LabelShort>Service Department</LabelShort>
                <MiniCont>{_.get(ticketData, "serviceDepartment.name")}</MiniCont>
                <LabelShort>Performed By</LabelShort>
                <div className=''>
                    {
                        (workData && workData.performedBy && workData.performedBy.length > 0) &&
                        <div className='grid grid-flow-col auto-cols-max'>
                            {workData.performedBy.map((item: any) => (
                                <div className="w-fit bg-slate-100 text-slate-600 text-light text-xs font-normal mr-1 px-2.5 py-0.5 rounded-full dark:bg-blue-200 dark:text-blue-800" >
                                    <span className='capitalize'>{getFirstLetters(item?.firstName)}. {item?.lastName}</span>
                                </div>
                            ))}
                        </div>
                    }
                </div>
            </div>
        </div>



    )
}

export default AuthDetails