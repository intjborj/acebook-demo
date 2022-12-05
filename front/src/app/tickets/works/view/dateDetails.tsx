import React from 'react'
import Card from '@/components/common/card';
import ViewContainer from '@/components/layouts/custom-content-view-layout';
import { WorkFormValues } from '@/types/workDetails/workTypes';
import _ from 'lodash'
import PostTagIcon from '@/components/tags/tagIcon';
import { ticketStatusIdentifier } from '@/constants/options';
import CodeLabel from '@/components/customs/labels/codeLabel';
import LabelShort from '@/components/customs/labels/labelShort';
import MiniCont from '@/components/customs/labels/miniContent';
import BorderDashed from '@/components/ui/border';
import moment from 'moment';
import ReactTimeAgo from 'react-time-ago';

type Props = {
    ticketData?: any;
    workData?: WorkFormValues;
}

type LayoutType = {
    children?: any
}


const DateDetails = ({ workData, ticketData }: Props) => {
   

    const ContLayout = ({ children }: LayoutType) => (
        <div className=''>{children}</div>
    )
    return (


        <div className='pt-2 grid grid-cols-1 md:grid-cols-2 text-xs'>
            <div className='grid grid-cols-1'>
                <ContLayout> <span className='font-bold text-slate-600' >Date Started :</span><span>  {workData?.dateTimeStarted && moment(workData?.dateTimeStarted).format("ll LT")} </span></ContLayout>
                <ContLayout> <span className='font-bold text-slate-600' >Date Finished :</span><span> {workData?.dateTimeFinished && moment(workData?.dateTimeFinished).format("ll LT")} </span></ContLayout>
            </div>
            <div className='grid grid-cols-1 '>
                <div className=' flex justify-start md:justify-end'>
                    <>
                        <div className='grid gris-cols-1'>
                            <div > <span className='font-bold text-slate-600' > Created </span><span>{_.get(workData, "created_at") && <ReactTimeAgo date={new Date(_.get(workData, "created_at") as string)} locale="en-US" />} </span></div>
                            <div > <span className='font-bold text-slate-600' > Updated </span><span> {_.get(workData, "updated_at") && <ReactTimeAgo date={new Date(_.get(workData, "updated_at")as string)} locale="en-US" />} </span></div>
                        </div>
                    </>
                </div>
            </div>
        </div>



    )
}

export default DateDetails