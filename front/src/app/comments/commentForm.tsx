// Dependencies
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import _ from 'lodash';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@apollo/client';
// Constants
import { CommentType } from '@/types/posts/commentTypes';
import { CommentContext } from '@/reducers/comments/commentContext';
import { commentValidationSchema } from './formvalidations/post-validation-schema';
import { PostContext } from '@/app/posts';
// Global Components
import Avatar from '@/components/ui/avatar';
import TextArea from '@/components/ui/forms/text-area'
import { SendIcon } from '@/components/icons/send-icon';
import SmallLoader from '@/components/ui/loaders/smallLoader';
// Hooks
import { PostContextRd } from '@/reducers/posts/postContextRd';
import { UPSERT_COMMENT } from '@graphql/operations/comments/commentMutations';
import { getAuthCredentials } from "@utils/auth-utils";
import { ProfilePicUploadPath } from '@/constants/uploadPaths';
import { boolean } from 'yup';

const CommentForm = () => {
    const [state, dispatch] = React.useContext<any>(CommentContext)
    const [statePostRd, dispatchPostRd] = React.useContext<any>(PostContextRd)
    const postContext = useContext(PostContext);
    const { id: userId, user } = getAuthCredentials();
    const [sendLoading, setSendLoading] = useState<boolean>(false)

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset
    } = useForm<CommentType>({
        //@ts-ignore
        // defaultValues: defaultValuesPost,
        resolver: yupResolver(commentValidationSchema),
    });
    const [upsertDept, { loading: commentLoading }] = useMutation(UPSERT_COMMENT);



    const onSubmit = async (values: CommentType) => {

        const payload = {
            message: values.message,
            post: _.get(postContext, '_id'),
            user: userId,
            postOwner: _.get(postContext, 'createdBy._id')
        }

        upsertDept({
            variables: {
                input: payload,
            },
        })
            .then((resp) => {
                // toast.success("Comment posted")

                reset()
                setTimeout(() => {
                    setSendLoading(false)

                    setTimeout(() => {
                        dispatch({ type: "refetch", modalData: true })
                        dispatchPostRd({ type: "refetchComment", commentActive: true })
                    }, 500);
                }, 500);



            })
            .catch((error) => { });
    };




    const submProc = (values: CommentType) => {
        setSendLoading(true)

        onSubmit(values)



    }


    return (
        <div className='relative'>
            <form >
                <div className='absolute pt-[0.33rem] pl-1'>
                    <Avatar
                        fileName={ProfilePicUploadPath({ fileName: _.get(user, "profilePicture"), id: _.get(user, "_id") })}
                        // fileName={_.get(user, "profilePicture")}
                        title="user name"
                        className="h-9 w-9"
                    />
                </div>
                <div className='absolute right-3'>
                    {/* <div className='absolute pt-[0.97rem] right-3'> */}
                    {sendLoading ?
                        <div className='flex justify-center pt-[0.625rem] '>
                            <SmallLoader />
                        </div>
                        :
                        <div className=' pt-[0.97rem]'>
                            <SendIcon className="text-gray-500 transition-colors hover:text-accent cursor-pointer" onClick={handleSubmit(submProc)} />
                        </div>
                    }
                    {/* {commentLoading ? <SmallLoader /> : <SendIcon className="text-gray-500 transition-colors hover:text-accent cursor-pointer" onClick={handleSubmit(onSubmit)} />} */}
                </div>
                <div className=''>
                    <TextArea
                        {...register('message')}
                        variant="outline"
                        className="mb-5 rounded-full "
                        inputClassName='rounded-full pl-12 pr-10 resize-none overflow-hidden'
                        row={1}
                        placeholder='Comment here...'
                    />
                </div>
            </form>
        </div>
    )
}

export default CommentForm