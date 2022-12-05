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
import { setAuthCredentials, getAuthCredentials } from '@/utils/auth-utils';
import _ from 'lodash';
import { PropForm } from '@/types/forms/propHookForm';
import ABButton from '@/components/ui/buttons/ABbutton';
import { uploadRenaming } from '@/services/uploadRenaming';
import { uploadPack } from '@/services/uploadPack';
import { ProfilePicUploadPath } from '@/constants/uploadPaths';
import AccCredentials from '@/app/accounts/credentials';
import { yupResolver } from '@hookform/resolvers/yup';
import { profValidationSchema } from './formvalidations/prof-validation-schema';
import AccEmpInfo from '@/app/accounts/employeeInfo';
import ContactInfo from '@/app/accounts/contactInfo';

type Props = {
  id?: string
  defaults?: AccFormSubmission
}

type UploadProcType = {
  newImages?: string;
  data?: any;
  codePaths?: string;
}


const ProfileForm = ({ id, defaults }: Props) => {
  const { token: cookieToken, permissions: cookiePermissions, id: cookieUserId, user: cookieUser } = getAuthCredentials();

  const hookFormProp = useForm<AccFormSubmission>({
    //@ts-ignore
    defaultValues: defaults ?? {},
    resolver: yupResolver(profValidationSchema),
  });

  const {
    register,
    handleSubmit,
    control,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = hookFormProp

  const [upsertAcc] = useMutation(UPSERT_ACCOUNT);

  // const updateProcess = async (values: AccFormSubmission) => {
  //   let payload: AccFormSubmission
  //   let uploadResult: any
  //   let uploadCheck: boolean = false
  //   let attachmentsImage = values.attachments_image

  //   if (values.attachments_image && values?.attachments_image?.length > 0) {

  //     uploadResult = uploadAttachment(attachmentsImage, 'profiles');
  //     uploadCheck = (await uploadResult).status == "ok" ? true : false
  //   }

  //   payload = {
  //     profilePicture: attachmentsImage[0].name,
  //     _id: id
  //   }

  //   upsertAcc({
  //     variables: {
  //       input: payload,
  //     },
  //   })
  //     .then((resp) => {
  //       setAuthCredentials(cookieToken as string, cookiePermissions, cookieUserId, _.get(resp, 'data.registerMU.user'));
  //       toast.success('Account successfully saved');
  //     })
  //     .catch((error) => {
  //       toast.error('Account failed to save');
  //     });

  // }

  const uploadProcess = async ({ newImages, data, codePaths }: UploadProcType) => {

    await uploadPack({
      attachments: newImages,
      type: 'profiles',
      codePaths: codePaths
    })
  }
  const submitProcess = async (values: AccFormSubmission) => {


    const { forSubmissionData, forRefetchFiles, renamedFiles } = await uploadRenaming({
      attachments: [values.attachments_image[0]],
      filenameCode: id,
      transactionType: "profilepicture",
      transactionCode: "prflpctr",
      fileType: 'image'
    }
    )

    let payload: AccFormSubmission = {
      profilePicture: _.get(forSubmissionData[0], "path"),
      departmentOnDuty: _.get(values, "departmentOnDuty._id"),
      contact: _.get(values, "contact"),
      email: _.get(values, "email"),
      _id: id
    }

    if (values.password) {
      payload.password = values.password

      if (!values.confPassword) {
        return toast.error("Please confirm password")
      } else {
        if (values.confPassword !== values.password) {
          return toast.error("Password does not match")
        }
      }

    }

    upsertAcc({
      variables: {
        input: payload,
      },
    })
      .then((resp) => {

        setAuthCredentials(cookieToken as string, cookiePermissions, cookieUserId, _.get(resp, 'data.registerMU.user'));
        uploadProcess({
          newImages: renamedFiles,
          codePaths: ProfilePicUploadPath({ id: id }),
        })
        toast.success('Account successfully saved');
        // window.location.reload();
      })
      .catch((error) => {
        toast.error('Account failed to save');
      });

  }




  const onSubmit = async (values: AccFormSubmission) => {

    if (confirm("Are you sure you want to update your profile?")) {
      submitProcess(values)
    }


  }


  return (
    <div className='mb-20'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ProfileUpload hookFormProp={hookFormProp as PropForm} />
        <ContactInfo register={register} errors={errors} />
        <AccCredentials control={control} register={register} errors={errors} autoPassword={false} watch={watch} isUpdate={false} />
        <AccEmpInfo register={register} errors={errors} control={control} watch={watch} />
        {/* <ProfileUpload register={register} errors={errors} watch={watch} getValues={getValues} setValue={setValue} /> */}
        <div className=" mb-4 flex justify-end ">
          <ABButton type='submit' >Save Details</ABButton>
        </div>
      </form>



    </div>
  )
}

export default ProfileForm