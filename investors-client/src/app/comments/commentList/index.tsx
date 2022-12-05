import React, { useContext, useEffect } from 'react'
import CommentSpec from './comment'
import { useQuery } from '@apollo/client';

import { GET_POST_COMMENTS } from '@graphql/operations/comments/commentQueries';
import { PostContext } from '@/app/posts';
import _ from 'lodash';
import { CommentType } from '@/types/posts/commentTypes';
import { CommentContext } from '@/reducers/comments/commentContext';

type Props = {}

const CommentList = (props: Props) => {
    const [state, dispatch] = React.useContext<any>(CommentContext)
    const postContext = useContext(PostContext);

    const { data: postComments, refetch, loading: commentLoading } = useQuery(GET_POST_COMMENTS, {
        variables: {
            "first": 1,
            "page": 1,
            "postId": _.get(postContext, '_id'),
        },
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
    });

    useEffect(() => {
      refetch()
    }, [!state.active])
    
    return (
        <div className='px-1 md:px-5'>
            {
            _.get(postComments, 'comments.data')  && _.get(postComments, 'comments.data').length >= 1 && _.get(postComments, 'comments.data').map((item : CommentType) => (
                    <CommentSpec data={item} />
                ))
            }

        </div>
    )
}

export default CommentList