import { ImageIcon } from '@/components/icons/image-icon'
import React, { useState, useEffect } from 'react'
import PreviewIndex from '../previews';

type Props = {
  register: any;
  getValues?: any;
  watch?: any;
  setValue?: any;
}

const initialPreview: string[] = []

const ImageUpload = ({ register, getValues, setValue, watch }: Props) => {

  const [previewImage, setPreviewImage] = useState(initialPreview)

  useEffect(() => {
    register('attachments_image', { required: false });
    setPreviewImage([])
  }, [])

  useEffect(() => {
    let att = watch("attachments_image")
    if (att) {
      setPreviewImage(att)
    }

  }, [watch("attachments_image")])

  useEffect(() => {
    let tempAtt = getValues("tempAttachments_image")
    if (tempAtt && tempAtt.length > 0) {

      let newAttachment = previewImage
      newAttachment.push(tempAtt[0])

      setValue("attachments_image", newAttachment)
      setPreviewImage(newAttachment)

    }
  }, [watch("tempAttachments_image")])

 

  return (
    <div className='relative'>

      <input type="file" className='h-auto top-0 left-0 absolute w-full opacity-0  border-8 cursor-pointer' accept="image/*" {...register('tempAttachments_image')} />
      <ImageIcon />



    </div>
  )
}

export default ImageUpload