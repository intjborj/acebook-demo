import React from 'react'
import { useMutation } from '@apollo/client';
import { ARCHIVE_WORK } from '@graphql/operations/tickets/ticketMutation';
import { useForm } from 'react-hook-form';
import ABModal from '@/components/customs/modals/ABModal';
import TextArea from '@/components/ui/forms/text-area';
import ABButton from '@/components/ui/buttons/ABbutton';
import BorderDashed from '@/components/ui/border';
import ArchivePackIcon from '@/components/customs/iconPackage/archivePack-icon';
import { toast } from 'react-toastify';
import { PostContextRd } from '@/reducers/posts/postContextRd';
import ArrowUturnLeftPackIcon from '@/components/customs/iconPackage/arrowUturnLeftPack-icon';

type Props = {
    workData?: any;
    ticketData?: any;
}
type FormType = {
    archiveRemarks: string
}

const ArchiveWork = ({ workData, ticketData }: Props) => {
    const [archive] = useMutation(ARCHIVE_WORK);
    const [statePostRd, dispatchPostRd] = React.useContext<any>(PostContextRd)

    const hookFormProp = useForm<FormType>({
        //@ts-ignore
        // defaultValues: postDefault ?? defaultVals,
        // resolver: yupResolver(ticketRemarksValidationSchema),
    });

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        watch,
        reset,
        setValue,
        getValues
    } = hookFormProp;

    const archiveWork = (data: FormType, value: any) => {
        if (confirm("Are you sure you want to change archive status?")) {

            let payload = {
                _id: workData._id,
            }

            if (value) {
                payload = { ...payload, ...value }
            }

            archive({
                variables: {
                    input: payload,
                },
            })
                .then((resp) => {
                    toast.success('Work Successfully Archived');
                    dispatchPostRd({ type: "refetch", modalData: true })
                })
                .catch((error) => {

                    toast.error('Work failed to save');
                });
        }
    }


    return (
        <div>
            <>
                {workData?.isArchived ? <div onClickCapture={(event: any) => { archiveWork(event, { isArchived: false }) }}><ArrowUturnLeftPackIcon /></div> :
                    <div>
                        {/* <div onClickCapture={(event: any) => { archiveWork(event, true) }}> */}
                        <ABModal button={ <ArchivePackIcon /> }>
                            <form 
                            className='p-2'
                            onSubmit={handleSubmit((data: FormType) => archiveWork(data, {
                                isArchived: true,
                                archiveRemarks: data.archiveRemarks
                            }))}>

                                <TextArea
                                    label={'Archive Remarks *'}
                                    {...register('archiveRemarks')}
                                    error={errors.archiveRemarks?.message!}
                                    variant="outline"
                                    inputClassName='rounded-md'
                                    className="mb-5"
                                />
                                <div className=' flex justify-end pb-3'>
                                    <ABButton type='submit'>Save</ABButton>
                                </div>
                                <BorderDashed />
                            </form>
                        </ABModal>
                    </div>
                }
            </>
        </div>
    )
}

export default ArchiveWork