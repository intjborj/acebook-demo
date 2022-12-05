import { FileIcon } from '@/components/icons/file-icon';
import React, { useState, useEffect } from 'react'
import PreviewIndex from '../previews';

type Props = {
  register: any;
  getValues?: any;
  watch?: any;
  setValue?: any;
}

const initialPreview: string[] = []

const FileUpload = ({ register, getValues, setValue, watch }: Props) => {

  const [previewAtt, setPreviewAtt] = useState(initialPreview)

  useEffect(() => {
    register('attachments_file', { required: false });
    setPreviewAtt([])
  }, [])

  useEffect(() => {
    let att = watch("attachments_file")
    if (att) {
      setPreviewAtt(att)
    }

  }, [watch("attachments_file")])

  useEffect(() => {
    let tempAtt = getValues("tempAttachments_file")
    if (tempAtt && tempAtt.length > 0) {

      let newAttachment = previewAtt
      newAttachment.push(tempAtt[0])

      setValue("attachments_file", newAttachment)
      setPreviewAtt(newAttachment)

    }
  }, [watch("tempAttachments_file")])

 

  return (
    <div className='relative'>

      <input type="file" className='h-auto top-0 left-0 absolute w-full opacity-0  border-8 cursor-pointer' accept=".xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf" {...register('tempAttachments_file')} />
      <FileIcon />



    </div>
  )
}

export default FileUpload