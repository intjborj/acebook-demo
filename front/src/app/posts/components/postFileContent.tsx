import FilePreview from '@/components/upload/previews/filePreview'
import React, {useContext} from 'react'
import { UPLOAD_LINK } from '@/constants/uploads';
import { PostAttachmentUploadPath } from '@/constants/uploadPaths';
import _ from 'lodash';
import { PostContext } from '@/app/posts';
import { fileImport } from '@/services/fileManangement';

type Props = {
  attachments?:any;
}

const PostFileContent = ({attachments}: Props) => {
  const postContext = useContext(PostContext);
  return (
    <div>
      {
        attachments && attachments.map((item: any)=>(
          <a href={ fileImport({ type: "post", fileName: PostAttachmentUploadPath({fileName: item.path, id: _.get(postContext, "createdBy._id"), type: 'file'}) })  } download> <FilePreview attachment={{name: item?.path}}/></a> 
          // <a href={UPLOAD_LINK('files',item?.path)} download> <FilePreview attachment={{name: item?.path}}/></a> 
          // <a href={UPLOAD_LINK('files\\'+item?.path)} download> <FilePreview attachment={{name: item?.path}}/></a> 
          // <a href={UPLOAD_LINK('files/'+item?.path)} download> <FilePreview attachment={{name: item?.path}}/></a> 
        ))
      }
   
    </div>
  )
}

export default PostFileContent