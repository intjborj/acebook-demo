import { CommentType } from '@/types/posts/commentTypes';
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { commentValidationSchema } from './formvalidations/post-validation-schema';
import Input from '@admin/components/ui/input';
import Avatar from '@/components/ui/avatar';
import TextArea from '@/components/ui/forms/text-area'
import { SendIcon } from '@/components/icons/send-icon';
import { gql, useMutation } from '@apollo/client';
import { UPSERT_COMMENT } from '@graphql/operations/comments/commentMutations';
import { PostContext } from '../posts';
import _ from 'lodash';
import { getAuthCredentials } from "@utils/auth-utils";
import { toast } from 'react-toastify';
import Spinner from '@/components/ui/loaders/spinner/spinner';
import Loader from '@/components/ui/loaders/loader';
import SmallLoader from '@/components/ui/loaders/smallLoader';
import { CommentContext } from '@/reducers/comments/commentContext';

type Props = {}

const CommentForm = (props: Props) => {
    const [state, dispatch] = React.useContext<any>(CommentContext)
    const postContext = useContext(PostContext);
    const { id: userId, user } = getAuthCredentials();

    const [imgerror, setImgerror] = React.useState<boolean>(false)

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
            user: userId
        }


        upsertDept({
            variables: {
                input: payload,
            },
        })
            .then((resp) => {

                toast.success("Comment posted")
                dispatch({ type: "refetch", modalData: true })
                reset()
                // reset({ message: "bill" })
            })
            .catch((error) => { });
    };

    return (
        <div className='relative'>
            <form >
                <div className='absolute pt-[0.33rem] pl-1'>
                    <Avatar
                        fileName={_.get(user, "profilePicture")}
                        // src={_.get(user, "profilePicture") ? `/uploads/profiles/${_.get(user, "profilePicture")}` :    '/_next/static/media/avatar.c9441dc8.svg'}
                        title="user name"
                        className="h-9 w-9"
                    />
                </div>
                <div className='absolute pt-[0.97rem] right-3'>
                    {
                        commentLoading ? <SmallLoader /> : <SendIcon className="text-gray-500 transition-colors hover:text-accent cursor-pointer" onClick={handleSubmit(onSubmit)} />
                    }
                </div>

                <div className=''>
                    <TextArea
                        // label={'Department Name'}
                        {...register('message')}
                        // error={t(errors.deptName?.message!)}
                        variant="outline"
                        className="mb-5 rounded-full "
                        inputClassName='rounded-full pl-12 pr-10 resize-none overflow-hidden'
                        // dimension='small'
                        row={1}
                        placeholder='Comment here...'
                    />
                </div>

            </form>
        </div>
    )
}

export default CommentForm