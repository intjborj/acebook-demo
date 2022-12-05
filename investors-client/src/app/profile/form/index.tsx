import React from 'react'
import { useForm } from 'react-hook-form';
import {
  AccFormValues,
  AccFormSubmission
} from '@/types/accounts/accountTypes';
import ProfileUpload from './profileUpload';
import Button from '@admin/components/ui/button';
import { uploadAttachment } from '@/services/uploading';
import { useMutation } from '@apollo/client';
import { UPSERT_ACCOUNT } from '@graphql/operations/accounts/accountMutations';
import { toast } from 'react-toastify';
import { setAuthCredentials, getAuthCredentials} from '@/utils/auth-utils';
import _ from 'lodash';

type Props = {
  id?: string
}

const ProfileForm = ({ id }: Props) => {
  const { token: cookieToken, permissions: cookiePermissions, id: cookieUserId, user: cookieUser } = getAuthCredentials();

  const {
    register,
    handleSubmit,
    control,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<AccFormSubmission>({
    //@ts-ignore
    defaultValues: {},

    // resolver: yupResolver({defaultValues ? accValidationSchemaUpdate : accValidationSchema}),
  });

  const [upsertAcc] = useMutation(UPSERT_ACCOUNT);

  const updateProcess =async (values: AccFormSubmission)=>{
    let payload: AccFormSubmission
    let uploadResult: any
    let uploadCheck: boolean = false
    let attachmentsImage = values.attachments_image

    if (values.attachments_image && values?.attachments_image?.length > 0) {
     
      uploadResult = uploadAttachment(attachmentsImage, 'profiles');
      uploadCheck = (await uploadResult).status == "ok" ? true : false
    }

    payload ={
      profilePicture : attachmentsImage[0].name,
      _id: id
    }

    upsertAcc({
      variables: {
        input: payload,
      },
    })
      .then((resp) => {
        setAuthCredentials(cookieToken as string, cookiePermissions, cookieUserId, _.get(resp, 'data.registerMU.user'));
        toast.success('Account successfully saved');
      })
      .catch((error) => {
        toast.error('Account failed to save');
      });

  }




  const onSubmit = async (values: AccFormSubmission) => {
   
    if(confirm("Are you sure you want to update your profile?")){
      updateProcess(values)
    }


  }


  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ProfileUpload register={register} errors={errors} watch={watch} getValues={getValues} setValue={setValue} />
        <div className="text-end mb-4 ">
          <Button loading={false}>Save Details</Button>
        </div>
      </form>



    </div>
  )
}

export default ProfileForm