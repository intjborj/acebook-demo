// Dependencies
import React, { useContext } from 'react'
// Constants
import { TicketWorksUploadPath } from '@/constants/uploadPaths';
import { AttachmentObj, WorkFormValues } from '@/types/workDetails/workTypes';
// Global Components
import ImageView from '@/components/attachments/imageView';
import ImageClick from '@/components/customs/modals/imageClickModal';
// Hooks
import { fileImport } from '@/services/fileManangement';
import ABDisplaySectionLabel from '@/components/customs/layouts/ABDisplaySectionLabel';
import ABCardDataLayout from '../../layouts/ABCardDataLayout';
import EmptyAttchSvg from '../../information/emptyAttchments';
import { isEmpty } from 'lodash';


type Props = {
    attachments?: any[],
    initialPath: string;
}

const ABAttachmentDisplaySection = ({ attachments, initialPath }: Props) => {
    return (
        <div className='w-full'>
            <ABDisplaySectionLabel>Attachments</ABDisplaySectionLabel>
            <div className='grid grid-cols-2'>
                {
                    (attachments && attachments.length > 0) ? attachments.map((item: AttachmentObj, index: number) => (
                        <div className='p-3 drop-shadow-md'>
                            <ImageClick image={fileImport({ type: "post", fileName: `${initialPath}/${item.path}` })}>
                                <ImageView index={index}
                                    className='rounded-lg object-cover h-48 w-96'
                                    fileName={`${initialPath}/${item.path}`}
                                />
                            </ImageClick>
                        </div>
                    )) : <></>
                }
            </div>
            { (isEmpty(attachments) && attachments?.length == 0) && <div className=' flex justify-center'>
                <div className=' w-32'>
                    <EmptyAttchSvg />
                </div>
            </div>}
        </div>
    )
}

export default ABAttachmentDisplaySection