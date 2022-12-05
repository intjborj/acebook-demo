import ImageDynamicPreview from '@/components/upload/previews/imageDynamicPreview';
import { PropForm } from '@/types/forms/propHookForm';
import React, { useState, useEffect } from 'react'

type Props = {
    hookFormProp: PropForm;
    layoutClass?: string;
};

const ABFormAttPreviews = ({ hookFormProp, layoutClass }: Props) => {
    const { register, errors, getValues, setValue, watch } = hookFormProp
    const [images, setImages] = useState<any>([])

  


    useEffect(() => {
        if (getValues("attachments_image")) {
            setImages(getValues("attachments_image"))
        }
    }, [watch("attachments_image")])

    
    
    const removeAttachment = (data: any) => {
        let imagesAttch = getValues("attachments_image");
        imagesAttch = imagesAttch.filter((item: any) => {
            return item.name !== data
        })

        setValue("attachments_image", imagesAttch)
    }


    return (
        <div>
            <div className={`${layoutClass ?? 'grid grid-cols-2'}`}>
                {
                    images.length > 0 && images.map((item: any) => (
                        <ImageDynamicPreview attachment={item} triggerRemove={removeAttachment} imageClass={'object-cover h-48 w-96'} />
                    ))
                }

            </div>
        </div>
    )
}

export default ABFormAttPreviews