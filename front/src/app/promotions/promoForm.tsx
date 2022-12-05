import ABFormAttachment from '@/components/customs/forms/ABFormAttachment';
import { PropForm } from '@/types/forms/propHookForm';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import ImageUpload from '@/components/upload/image';
import AttPreviews from '@/components/customs/forms/ABFormAttachment/previews';
import ABButton from '@/components/ui/buttons/ABbutton';
import BorderDashed from '@/components/ui/border';
import { uploadRenaming } from '@/services/uploadRenaming';
import { UPSERT_PROMOTION } from '@graphql/operations/promotions/promotionMutation';
import { toast } from 'react-toastify';
import { uploadPack } from '@/services/uploadPack';
import { PromotionsUploadPath } from '@/constants/uploadPaths';
import { PostContextRd } from '@/reducers/posts/postContextRd';


type Props = {}

type PromoType = {
    attachments_image?: string;
}

type UploadProcType = {
    newImages?: string;
    data?: any;
    codePaths?: string;
}

const PromoForm = (props: Props) => {
    const [statePostRd, dispatchPostRd] = React.useContext<any>(PostContextRd)

    const hookFormProp = useForm<PromoType>({
        //@ts-ignore
        // defaultValues: defaultVals ?? {},
        // resolver: yupResolver(ticketValidationSchema),
    });

    const [upsertProm] = useMutation(UPSERT_PROMOTION);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        watch,
        reset,
        setValue,
        getValues
    } = hookFormProp

    const uploadProcess = async ({ newImages, data, codePaths }: UploadProcType) => {

        await uploadPack({
            attachments: newImages,
            type: 'promotions',
            codePaths: codePaths
        })
    }

    const submissionProcess = async (data: PromoType) => {
        const { forSubmissionData, forRefetchFiles, renamedFiles } = await uploadRenaming({
            attachments: data.attachments_image,
            transactionType: "promotionals",
            transactionCode: "prmimgs",
            fileType: 'image'
        }
        )

        let payload = {
            paths: forSubmissionData
        }

       

        upsertProm({
            variables: {
                input: payload,
            },
        })
            .then((resp) => {

                uploadProcess({
                    newImages: renamedFiles,
                    codePaths: PromotionsUploadPath({}),
                })
                reset()
                toast.success('Promotion successfully saved');
                dispatchPostRd({ type: "refetch", commentActive: true })
            })
            .catch((error) => {
                toast.error('Promotion failed to save');
            });

    }

    const onSubmit = (data: PromoType) => {

        if (confirm("Are you sure you want to add promotional images?")) {
            submissionProcess(data)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* <ABFormAttachment hookFormProp={hookFormProp as PropForm} /> */}
                <div className="grid  gap-3 md:grid-cols-2 lg:grid-cols-2">

                    <div className='w-10 text-slate-500'>
                        <ImageUpload
                            register={register}
                            getValues={getValues}
                            setValue={setValue}
                            watch={watch} />
                    </div>
                </div>
                <div>
                    <AttPreviews layoutClass='grid grid-cols-1' hookFormProp={hookFormProp} />
                </div>
                <div className='flex justify-center mb-5'><ABButton type='submit'>Save</ABButton></div>
                <BorderDashed />
            </form>
        </div>
    )
}

export default PromoForm