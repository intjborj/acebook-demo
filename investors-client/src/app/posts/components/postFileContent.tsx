import FilePreview from '@/components/upload/previews/filePreview'
import React from 'react'
import { UPLOAD_LINK } from '@/constants/uploads';

type Props = {
  attachments?:any;
}

const PostFileContent = ({attachments}: Props) => {
  return (
    <div>
      {
        attachments && attachments.map((item: any)=>(
          <a href={UPLOAD_LINK('files',item?.path)} download> <FilePreview attachment={{name: item?.path}}/></a> 
          // <a href={UPLOAD_LINK('files\\'+item?.path)} download> <FilePreview attachment={{name: item?.path}}/></a> 
          // <a href={UPLOAD_LINK('files/'+item?.path)} download> <FilePreview attachment={{name: item?.path}}/></a> 
        ))
      }
   
    </div>
  )
}

export default PostFileContent