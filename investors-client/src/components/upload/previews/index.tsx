import React, { useEffect, useState } from 'react'
import FilePreview from './filePreview';
import ImagePreview from './imagePreview';

type Props = {
    attachments?: any;
    triggerRemove?: any;
    type?: string;
}

const PreviewIndex = ({ attachments, triggerRemove, type }: Props) => {

    return (

        <div className='relative flex gap-3 pt-4'>

            {
                type == 'image' && <>{attachments && attachments.map((item: any) => (<ImagePreview attachment={item} triggerRemove={(e: any) => triggerRemove && triggerRemove(e)} />))}</>
            }
            {
                type == 'file' && <>{attachments && attachments.map((item: any) => (<FilePreview attachment={item} triggerRemove={(e: any) => triggerRemove && triggerRemove(e)} />))}</>
            }

        </div>
    )
}

export default PreviewIndex