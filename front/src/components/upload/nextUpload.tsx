import type { NextPage } from 'next'
import React, { useState, useEffect, useMemo } from "react";
import { UploadIcon } from "@/components/icons/upload-icon";
import { Control, Controller } from 'react-hook-form';
import { initial } from 'lodash';
import ImagePreview from './previews/imagePreview';
import PreviewIndex from './previews';

type Props = {
    register: any;
    getValues?: any;
    watch?: any;
    setValue?: any;
}

const initialPreview: string[] = []

const NextUpload = ({ register, getValues, watch, setValue }: Props) => {

    const [isLoading, setIsLoading] = React.useState(false);
    const [previewImage, setPreviewImage] = useState(initialPreview)

    useEffect(() => {
        register('attachments', { required: false });
        setPreviewImage([])
    }, [])

    useEffect(() => {
        let tempAtt = getValues("tempAttachments")
        if (tempAtt && tempAtt.length > 0) {

            let newAttachment = previewImage
            newAttachment.push(tempAtt[0])

            setValue("attachments", newAttachment)
            setPreviewImage(newAttachment)

        }
    }, [watch("tempAttachments")])

    return (
        <>
            <div className="border-dashed border-2 relative border-border-base h-36 rounded flex flex-col justify-center items-center cursor-pointer focus:border-accent-400 focus:outline-none">

                <UploadIcon className="text-muted-light" />
                <p className="text-body text-sm mt-4 text-center">
                    <span className="font-semibold text-gray-500">Upload Files here...</span>

                    <input type="file" name="attachments" className='h-36 top-0 left-0 absolute w-full opacity-0  border-8' {...register('tempAttachments')} />
                    {/* <input type="file" name="attachments" className='h-36 top-0 left-0 absolute w-full opacity-0  border-8' {...register('attachments')} multiple /> */}
                </p>
            </div>

            <>
                <PreviewIndex attachments={watch("attachments")} />
            </>


        </>
    )
}

export default NextUpload