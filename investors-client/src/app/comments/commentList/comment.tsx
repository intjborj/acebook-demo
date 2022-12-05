import { ReplyIcon } from '@/components/icons/reply-icon'
import { CommentType } from '@/types/posts/commentTypes'
import React, { useContext } from 'react'
import CommentedByDetails from './commentedByDetails'



type Props = {
    data: CommentType
}

const CommentSpec = ({ data }: Props) => {

    return (
        <div className=''>
            {/* <ReplyIcon/> */}
            <CommentedByDetails firstName={data.user?.firstName} lastName={data.user?.lastName} created_at={data.created_at} profilePicture={data.user?.profilePicture} />


            <div className='pl-12 text-xs  '>
                  {data.message}
            </div>
        </div>
    )
}

export default CommentSpec