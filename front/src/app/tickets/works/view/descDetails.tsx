import React, { useContext } from 'react'
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
import WorkSectionHeader from './components/layouts/sectionHeader';
import { WorkViewContext } from '@/app/tickets/works/view';
import ABDisplaySectionLabel from '@/components/customs/layouts/ABDisplaySectionLabel';
import { workCatIdentifier } from '@/constants/tickets/works/options';
import { ContainerBgColor, LabelColor } from '@/constants/enums/themes';

type Props = {
    ticketData?: any;
    workData?: WorkFormValues;
}
const DetailsLayout = ({ title, description }: { title: string, description?: string }) => {
    return (
        <>
            <h1 className="mb-2 text-xs font-semibold text-gray-700 dark:text-white md:text-sm ">{title}</h1>
            <div className='text-sm bg-slate-100 rounded p-1 mt-2 px-3 mb-1'>
                <div className='text-xs md:text-sm '>  {description}</div>
            </div>
        </>
    )
}

const DescDetails = ({ }: Props) => {
    const { workData, ticketData } = useContext(WorkViewContext) || {};




    return (

        <div className='w-full'>
            <div className=' grid grid-cols-2'>


                <ABDisplaySectionLabel>Work Remarks</ABDisplaySectionLabel>
                {
                    workData?.workCategory &&
                    <div className='flex justify-end'>
                        <div className={`${ContainerBgColor.PRIMARY} ${LabelColor.PRIMARY} rounded-full h-fit text-xs px-2`}>
                            {workCatIdentifier(workData?.workCategory, "label")}
                        </div>
                    </div>
                }
            </div>
            {workData?.descActualWorkDone &&
                <>
                    <DetailsLayout title='Description of actual work done' description={workData?.descActualWorkDone} />
                </>
            }
            {workData?.findings &&
                <>
                    <DetailsLayout title='Findings' description={workData?.findings} />
                </>
            }
            {(workData?.isArchived && workData?.archiveRemarks) &&
                <>
                    <DetailsLayout title='Archive Remarks' description={workData?.archiveRemarks} />
                </>
            }
        </div>




    )
}

export default DescDetails