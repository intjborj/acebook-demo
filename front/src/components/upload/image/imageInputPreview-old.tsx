import { ImageIcon } from '@/components/icons/image-icon'
import Image from 'next/image';
import React, { useState, useEffect } from 'react'
import PreviewIndex from '../previews';

type Props = {
    register?: any;
    getValues?: any;
    watch?: any;
    setValue?: any;
    selected?: any;
    defaultImage?: any;
    inputHeight?: string;
}

type StateType = () => {

}

const initialPreview: string[] = []

const ImageInputPreview = ({ register, getValues, setValue, watch, selected, defaultImage, inputHeight }: Props) => {
    const [image, setImage] = useState<string>('/img/default-image.jpg')
   

    //   const [previewImage, setPreviewImage] = useState(initialPreview)

    //   useEffect(() => {
    //     register('attachments_image', { required: false });
    //     setPreviewImage([])
    //   }, [])

    //   useEffect(() => {
    //     let att = watch("attachments_image")
    //     if (att) {
    //       setPreviewImage(att)
    //     }

    //   }, [watch("attachments_image")])

    //   useEffect(() => {
    //     let tempAtt = getValues("tempAttachments_image")
    //     if (tempAtt && tempAtt.length > 0) {

    //       let newAttachment = previewImage
    //       newAttachment.push(tempAtt[0])

    //       setValue("attachments_image", newAttachment)
    //       setPreviewImage(newAttachment)

    //     }
    //   }, [watch("tempAttachments_image")])

    const getImageUrl = (data: any) =>{
        const inptImage = data[0]
        var file = inptImage;
        var reader = new FileReader();
        var url = reader.readAsDataURL(file);

        reader.onloadend = function (e) {
            if (reader.result) {
                
                setImage(reader.result as any)
            }
        };
    }

    useEffect(() => {
        if (defaultImage) {
            getImageUrl(defaultImage)
        }
    }, [defaultImage])


    const handleChange = (data: any) => {

        if (selected) {
            selected(data)
        }
        getImageUrl(data)
    }



    const customSize = inputHeight ?? '4.5rem'
    return (
        <div className='relative '>
            {/* absolute opacity-0 */}
            <input type="file" onChange={(e) => { handleChange(e.target.files) }} style={{height:customSize }} className={` opacity-0 top-0 left-0 z-10    w-full absolute  border-8 cursor-pointer`} accept="image/*"
           //    {...register('tempAttachments_image')} 
            />
            {/* <ImageIcon /> */}
            <Image
                src={image}
                // src={logo?.original ?? logoPlaceholder}
                alt={'candidate'}
                layout="responsive"
                width={customSize}
                height={customSize}  // objectFit="contain"
                loading="eager"
                className='rounded-md object-cover'
            />


        </div>
    )
}

export default ImageInputPreview