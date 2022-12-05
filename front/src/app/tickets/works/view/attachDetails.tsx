import ImageView from '@/components/attachments/imageView';
import ImageClick from '@/components/customs/modals/imageClickModal';
import { fileImport } from '@/services/fileManangement';
import { AttachmentObj, WorkFormValues } from '@/types/workDetails/workTypes';
import React, { useContext } from 'react'
import WorkSectionHeader from './components/layouts/sectionHeader'
import { WorkViewContext } from '@/app/tickets/works/view';
import { TicketWorksUploadPath } from '@/constants/uploadPaths';
import ABDisplaySectionLabel from '@/components/customs/layouts/ABDisplaySectionLabel';
import ABAttachmentDisplaySection from '@/components/customs/data/ABAttachmentDisplaySection';
type Props = {
    ticketData?: any;
    workData?: WorkFormValues;
}


const AttachDetails = ({ }: Props) => {
    const { workData, ticketData } = useContext(WorkViewContext) || {};

    return (
        <div className='w-full'>
            <ABAttachmentDisplaySection attachments={workData?.attachments} initialPath={TicketWorksUploadPath({ ticketCode: ticketData.code, workCode: workData?.code as string })} />
        </div>
    )
}

export default AttachDetails