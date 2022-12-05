import { AttachmentType } from '@/types/posts/attachmentTypes';
import { initial } from 'lodash';
import React, { useState, useEffect } from 'react'
import PostFileContent from '../postFileContent';
import PostImageContent from '../postImageContent';

type Props = {
    attachments?: any;
    images?: any;
    files?: any;
}

const initialState = {
    images: [],
    files: []
}

const PostAttachments = ({ attachments }: Props) => {
    const [state, setState] = useState<Props>(initialState)


    useEffect(() => {

        let images = attachments.filter((item: AttachmentType) => {
            return item.type === 'image'
        })

        let files = attachments.filter((item: AttachmentType) => {
            return item.type === 'file'
        })

        setState((p) => ({ ...p, images: images, files: files }))
    }, [attachments])
    return (
        <div>
            {
                attachments && attachments.length >= 1 &&
                <>
                    <PostImageContent attachments={state.images} />
                    <PostFileContent attachments={state.files} />
                    {/* {state.images > 1 && <PostImageContent attachments={state.images} />}
             {state.files > 1 && <PostFileContent  attachments={state.files}/>} */}
                </>
            }
        </div>
    )
}

export default PostAttachments