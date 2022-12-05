import React, { useContext, useEffect, useState } from 'react'
import { PostContext } from '@/app/posts';
import CommentSpec from '../commentList/comment';
import { PostContextRd } from '@/reducers/posts/postContextRd';
import { useLazyQuery } from '@apollo/client';
import { GET_POST_COMMENTS_PREVIEW } from '@graphql/operations/comments/commentQueries';
import _ from 'lodash';
import ABTransition from '@/components/customs/transitions/ABTransition';
import ABModal from '@/components/customs/modals/ABModal';
import CommentList from '../commentList';
import CommentForm from '../commentForm';
type Props = {}
type StateType = {
    openModal?: boolean;
}

const FeedCommentList = (props: Props) => {
    const postContext = useContext(PostContext);
    const [statePostRd, dispatchPostRd] = React.useContext<any>(PostContextRd)
    const [state, setState] = useState<StateType>({
        openModal: false
    })
    const [getCommentPreview, { error, data: CommentPrevs, loading, refetch: refetchCP }] = useLazyQuery(GET_POST_COMMENTS_PREVIEW,
        { notifyOnNetworkStatusChange: true, });
    const [commentList, setCommentList] = useState<any[]>([])

    useEffect(() => {
        if (statePostRd.commentActive == true) {
            if (CommentPrevs == undefined) {
                getCommentPreview({ variables: { postId: postContext._id } })
            } else {
                refetchCP({ postId: postContext._id })
            }
            dispatchPostRd({ type: "refetchComment", commentActive: false })
        }
        return () => {
            // setState((p) => ({ ...p, openModal: false }))
            dispatchPostRd({ type: "refetchComment", commentActive: false })
        }
    }, [statePostRd.commentActive])

    useEffect(() => {
        if (postContext && postContext.comments && postContext.comments.length > 0) {
            setCommentList(postContext.comments)
        }
        return () => {
            setCommentList([])
        }
    }, [postContext])


    useEffect(() => {
        if (CommentPrevs && _.get(CommentPrevs, "commentPreview.data") && _.get(CommentPrevs, "commentPreview.data").length > 0) {
            setCommentList(_.get(CommentPrevs, "commentPreview.data"))
        }
    }, [!loading])

    return (
        <div>
            {
                (commentList && commentList && commentList.length > 0) &&
                <>
                    {
                        commentList.map((item: any, index: number) => (
                            <div key={index} >
                                <ABTransition>
                                    <CommentSpec data={item} />
                                </ABTransition>
                            </div>
                        ))}
                </>
            }

            <div className='pt-2 flex justify-center'>
                <ABModal closeLocation='head' isOpen={(data: boolean) => setState((p) => ({ ...p, openModal: data }))} button={<div className='bg-slate-100 rounded-full w-fit text-xs md:text-sm py-1 px-3 cursor-pointer text-slate-500 hover:drop-shadow-sm'>
                    View comments
                </div>}>
                    {state.openModal &&
                        <ABTransition>
                            <CommentForm/>
                            <CommentList />
                        </ABTransition>
                    }
                </ABModal>
            </div>
        </div>
    )
}

export default FeedCommentList