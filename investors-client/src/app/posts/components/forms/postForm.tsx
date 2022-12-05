import React, { useEffect, useState } from 'react'
import TextContent from './textContent'
import Button from '@admin/components/ui/button';
import PostedByDetails from '../postedByDetails';
import PostPrivacy from './postPrivacy';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { UPSERT_POST } from '@graphql/operations/posts/postMutation';
import { PostFormDefaultType, PostFormValues, PostViewDefaultType } from '@/types/posts/postTypes';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { getAuthCredentials } from "@utils/auth-utils";
import { yupResolver } from '@hookform/resolvers/yup';
import { postValidationSchema } from './formvalidations/post-validation-schema';
import PostDepartmentTag from './postDepartmentTag';
import { defaultValuesPost } from './defaulValuesPost';
import { extractObjectId } from '@/services/extractions';
import { uploadAttachment } from '@/services/uploading';
import AttachmentUpload from '@/components/upload';
import { PostContextRd } from '@/reducers/posts/postContextRd';
import { initialStatePostRedc } from '@/reducers/posts/postReducer';
import { postDefaultFormService } from '../services/postDefaultFormServices';



type Props = {
    data?: PostViewDefaultType | null;
}

const PostForm = ({ data: defaults }: Props) => {

   
    const [statePostRd, dispatchPostRd] = React.useContext<any>(PostContextRd)
    const { id: userId, user } = getAuthCredentials();
    const [upsertPost] = useMutation(UPSERT_POST);

    const {
        register, handleSubmit, control, getValues, watch, setValue, reset,
        formState: { isDirty, errors },
    } = useForm<PostFormValues>({
        //@ts-ignore
        defaultValues: defaults ? defaults.postData : defaultValuesPost,
        resolver: yupResolver(postValidationSchema),
    });

    useEffect(() => {
        reset()
    }, [])

    const executeMutation = (payload: any) => {
        upsertPost({
            variables: {
                input: payload,
            },
        })
            .then((resp) => {
                toast.success("Post Created");
                if (!defaults?.postData?._id) {
                    reset()
                }

                dispatchPostRd({ type: "refetch", modalData: true })
            })
            .catch((error) => {
              
                toast.error("Failed to create post");
            });
    }

    const onSubmit = async (values: PostFormValues) => {
        let attachments: any = []

        // ====IMAGE ATTACHMENT====
        if (values.attachments_image && values?.attachments_image?.length > 0) {
            let attachmentsImage = values.attachments_image
            for (let i = 0; i < values?.attachments_image?.length; i++) {
                if (attachmentsImage[i].name) {
                    attachments.push({
                        path: attachmentsImage[i].name,
                        type: 'image'
                    })
                }
            }
        }

        // ====FILE ATTACHMENT====
        if (values.attachments_file && values?.attachments_file?.length > 0) {
            let attachmentsFile = values.attachments_file
            for (let i = 0; i < values?.attachments_file?.length; i++) {
                if (attachmentsFile[i].name) {
                    attachments.push({
                        path: attachmentsFile[i].name,
                        type: 'file'
                    })
                }
            }
        }


        let payload: PostFormValues = {};
        let payloadTemp = _.cloneDeep(values)

        payload._id = defaults?.postData?._id
        payload.content = _.get(payloadTemp, "content")
        payload.attachments = attachments
        payload.privacy = _.get(payloadTemp, "privacy.value");
        payload.createdBy = userId
        payload.createdByDepartment = _.get(user, 'departmentOnDuty._id')
        payload.taggedDepartments = values?.taggedDepartments?.length == 0 ? null : extractObjectId(values?.taggedDepartments)

       

        if (confirm('Comfirm post')) {
            let uploadResult: any
            let uploadCheck: boolean = false

            // ====IMAGE ATTACHMENT====
            if (values?.attachments_image && values?.attachments_image?.length > 0) {
                uploadResult = uploadAttachment(values.attachments_image, 'image');
                uploadCheck = (await uploadResult).status == "ok" ? true : false
            }

            // ====FILE ATTACHMENT====
            if (values?.attachments_file && values?.attachments_file?.length > 0) {
                uploadResult = uploadAttachment(values.attachments_file, 'file');
                uploadCheck = (await uploadResult).status == "ok" ? true : false
            }

            console.log("payload", payload)
            if (
                (values.attachments_image && values?.attachments_image?.length > 0) ||
                (values.attachments_file && values?.attachments_file?.length > 0)
            ) {
                if (uploadCheck) {
                    executeMutation(payload)
                } else {
                    toast.error("Failed to upload attachments");
                }
            } else {
                executeMutation(payload)
            }

        }

    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <article className="bg-light max-w-6xl w-screen h-full  md:h-auto md:w-[800px] xl:min-w-[800px] relative z-[51] md:rounded-xl">
                    {/* <article className="bg-light w-full  max-w-6xl xl:min-w-[1152px] relative z-[51] md:rounded-xl"> */}
                    {/* <div className='m-4 p-4'> */}
                    <div className="p-5 pt-15 md:pb-10 lg:p-14 xl:p-8">

                        <div className="mb-4 mt-5 grid grid-flow-col  gap-4">
                            <div className="row-span-3 ">
                                <PostedByDetails
                                    firstName={defaults ? defaults?.postedBy?.firstName : _.get(user, 'firstName')}
                                    lastName={defaults ? defaults?.postedBy?.lastName : _.get(user, 'lastName')}
                                    department={defaults ? defaults?.postedBy?.department : _.get(user, 'departmentOnDuty.name')}
                                    profilePicture={defaults ? defaults?.postedBy?.profilePicture : _.get(user, 'profilePicture')}
                                />
                            </div>
                            <div className="row-span-3 place-self-end"><Button loading={false}>Post</Button></div>
                            
                        </div>

                        <TextContent register={register} />
                        <PostPrivacy control={control} register={register} />
                        <PostDepartmentTag control={control} register={register} />

                        <hr />
                        <AttachmentUpload register={register} watch={watch} getValues={getValues} setValue={setValue} />
                        <div className='h-screen'></div>

                    </div>
                    {/* </div> */}
                </article>
            </form>
        </div >
    )
}

export default PostForm