import { ReplyIcon } from '@/components/icons/reply-icon'
import { CommentType } from '@/types/posts/commentTypes'
import React, { useContext } from 'react'
import CommentedByDetails from './commentedByDetails'
import { LabelColor } from '@/constants/enums/themes';
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid';
import ABDropdownMenuList, { ABDropMenuType } from '@/components/customs/menu/ABDropdownMenuList';
import { ARCHIVE_COMMENT } from '@graphql/operations/comments/commentMutations';
import { useMutation } from '@apollo/client';
import { getAuthCredentials } from "@utils/auth-utils";
import _ from 'lodash';
import { toast } from 'react-toastify';
import { CommentContext } from '@/reducers/comments/commentContext';
import { PostContextRd } from '@/reducers/posts/postContextRd';

type Props = {
    data: CommentType
}

const CommentSpec = ({ data }: Props) => {
    const [upsertDept, { loading: commentLoading }] = useMutation(ARCHIVE_COMMENT);
    const { id: userId, user } = getAuthCredentials();
    const [statePostRd, dispatchPostRd] = React.useContext<any>(PostContextRd)
    const [state, dispatch] = React.useContext<any>(CommentContext)

    const archiveProcess = () => {
        if (confirm("Are you sure you want to remove comment?")) {
            upsertDept({
                variables: {
                    input: {
                        "_id": data?._id,
                        "isArchived": true
                    },
                },
            })
                .then((resp) => {
                    toast.success("Comment Removed")
                    // setTimeout(() => {
                        dispatch({ type: "refetch", modalData: true })
                        dispatchPostRd({ type: "refetchComment", commentActive: true })
                    // }, 500);
                })
                .catch((error) => { 
                    toast.error("Failed to remove comment")
                });
        }

    }


    const commentOpts: ABDropMenuType[] = [
        {
            label: "Remove",
            display: true,
            action: () => archiveProcess()
        }
    ]

    return (
        <div className=''>
            {/* <ReplyIcon/> */}
            <div className=' grid grid-flow-col auto-cols-max'>
                <CommentedByDetails
                    firstName={data.user?.firstName}
                    lastName={data.user?.lastName}
                    created_at={data.created_at}
                    profilePicture={data.user?.profilePicture}
                    userId={data.user?._id}
                />

            </div>
            {(_.get(user, "_id") === data.user?._id) && <div className='absolute right-0 top-0 w-fit z-50'>
                {/* <span className={`${LabelColor.SECONDARY} text-xs`}>Remove</span> */}
                <ABDropdownMenuList
                    button={
                        <div className=' absolute right-0'>
                            <div className={`  text-xs scale-50  w-10 opacity-30 z-20 ${LabelColor.SECONDARY}`}> <EllipsisHorizontalIcon />
                            </div>
                        </div>
                    }
                    // button={<div className={`absolute right-0 text-xs scale-50 flex justify-end w-10 opacity-30 z-0 ${LabelColor.SECONDARY}`}> <EllipsisHorizontalIcon />
                    // </div>}
                    menu={commentOpts}
                />
            </div>}

            <div className='pl-12 text-xs  '>
                {data.message}
            </div>

        </div>
    )
}

export default CommentSpec