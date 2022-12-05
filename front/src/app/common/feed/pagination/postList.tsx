import { PostFormValues } from '@/types/posts/postTypes'
import React from 'react'

type Props = {
    postData?: PostFormValues[]
}

const PostList = ({postData}: Props) => {
  return (
    <div>PostList</div>
  )
}

export default PostList