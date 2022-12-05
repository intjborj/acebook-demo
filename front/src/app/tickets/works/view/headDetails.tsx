// Dependencies
import React, { useContext } from 'react'
import _ from 'lodash'
// Custom Components
import Card from '@/components/common/card';
import DateDetails from './dateDetails';
import EditPackIcon from '@/components/customs/iconPackage/editPack-icon';
import Link from '@/components/ui/link';
import { WorkViewContext } from '@/app/tickets/works/view';
import PostTagIcon from '@/components/tags/tagIcon';
import CodeLabel from '@/components/customs/labels/codeLabel';
// Hooks
import { getAuthCredentials } from "@utils/auth-utils";
// Constants
import { FrontPath } from '@/constants/enums/paths';
import { WorkFormValues } from '@/types/workDetails/workTypes';
import { ticketStatusIdentifier } from '@/constants/options';
import ArchiveWork from './archiveWork';
import ABArchiveTag from '@/components/customs/labels/ArchiveTag';

type Props = {
    ticketData?: any;
    workData?: WorkFormValues;
}


const DetailsAuth = ({ }: Props) => {
    const { workData, ticketData } = useContext(WorkViewContext) || {};
    const { user } = getAuthCredentials();

    return (
        <Card>
            <div className='grid grid-cols-2'>
                <div className='md:flex'>
                    <CodeLabel code={workData?.code} className={'flex justify-start text-xl  md:text-xl'} />  {workData?.isArchived && <div className='scale-75'> <ABArchiveTag /> </div>}
                </div>
                <div className='flex justify-end'>
                    {workData?.workStatus && <div className=''>
                        <PostTagIcon name={(_.get(workData, "workStatus") ? ticketStatusIdentifier(workData.workStatus, 'name') : '') as string} bgClass={(workData.workStatus ? ticketStatusIdentifier(workData.workStatus, 'class') : '') as string} />
                    </div>}
                    {
                        [_.get(ticketData, "serviceDepartment._id")].includes(_.get(user, "departmentOnDuty._id")) &&
                        <>
                            <div className='pl-2 flex gap-1'>
                                <Link href={`${FrontPath.TICKET_WORK_UPDATE}/${workData?._id}?fr=view`}> <EditPackIcon /></Link>
                                <ArchiveWork workData={workData}/>
                                </div>

                        </>

                    }
                </div>

            </div>
            <DateDetails workData={workData} />
        </Card>
    )
}

export default DetailsAuth