import CommentProvider from '@/reducers/comments/commentProvider'
import React, { useContext } from 'react'
import CommentForm from './commentForm'
import CommentList from './commentList'
import FeedCommentList from './feedCommentList'

type Props = {
    isFeed?: boolean;
}
const GenComments = ({ isFeed }: Props) => {

    return (
        <div className='item-center w-full  px-2 pt-3'>
            <hr />
            <div className='pt-2'>
                <CommentProvider>
                    <CommentForm />
                    {isFeed ? <FeedCommentList /> : <CommentList />}
                </CommentProvider>
            </div>
        </div>
    )
}

export default GenComments