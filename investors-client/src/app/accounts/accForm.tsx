
import { useForm } from 'react-hook-form';
import Button from '@admin/components/ui/button';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useTranslation } from 'next-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { accValidationSchema, accValidationSchemaUpdate } from './formvalidations/acc-validation-schema';
import { useMutation } from '@apollo/client';
import { UPSERT_ACCOUNT } from '@graphql/operations/accounts/accountMutations';
import AccBasicInfo from './basicInfo';
import AccEmpInfo from './employeeInfo';
import BorderDashed from '@/components/ui/border';
import AccCredentials from './credentials';
import ContactInfo from './contactInfo';
import {
  AccFormSubmission,
  AccFormValues,
} from '@/types/accounts/accountTypes';
import _ from 'lodash';
import { getAuthCredentials } from "@utils/auth-utils";
import {
  setAuthCredentials,
} from '@/utils/auth-utils';
import { extractObjectId } from '@/services/extractions';

const AccountForm = ({ defaultValues }: any) => {
  const { token: cookieToken, permissions: cookiePermissions, id: cookieUserId, user: cookieUser } = getAuthCredentials();

  // const AccountForm: NextPageWithLayout = ({defaultValues} : any) => {
  const router = useRouter();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AccFormValues>({
    //@ts-ignore
    defaultValues: defaultValues ?? {},

    resolver: yupResolver(defaultValues ? accValidationSchemaUpdate : accValidationSchema),
  });



  const [upsertAcc] = useMutation(UPSERT_ACCOUNT);

  const onSubmit = async (values: AccFormValues) => {
    let payload: AccFormSubmission | AccFormValues;
    payload = _.cloneDeep(values);

    const deptOnDuty: any = values?.departmentOnDuty?._id;

    payload.department = extractObjectId(values?.department);
    payload.departmentOnDuty = deptOnDuty;

    if (defaultValues?._id) {
      payload._id = defaultValues._id
      delete payload.updated_at
      delete payload.created_at
      delete payload.__typename
    }

    if (payload.password) {
      payload.password = payload.password

      if (!payload.confPassword) {
        return toast.error("Please confirm password")
      } else {
        if (payload.confPassword !== payload.password) {
          return toast.error("Password does not match")
        }
      }

    } else {
      delete payload.password
    }


    delete payload.confPassword

    if (confirm('Are you sure you want to save user?')) {
      upsertAcc({
        variables: {
          input: payload,
        },
      })
        .then((resp) => {
          if (defaultValues?._id && defaultValues._id === cookieUserId) {
            setAuthCredentials(cookieToken, cookiePermissions, cookieUserId, _.get(resp, 'data.registerMU.user'));
            toast.success(t('Session Updated'));
          }

          toast.success(t('Account successfully saved'));

        })
        .catch((error) => {
          console.log("error", error)
          toast.error(t('Account failed to save'));
        });
    }
  };
  const column = 'auto';
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <AccBasicInfo register={register} errors={errors} />
        <BorderDashed />
        <AccEmpInfo register={register} errors={errors} control={control} />
        <BorderDashed />
        <ContactInfo register={register} errors={errors} />
        <BorderDashed />
        <AccCredentials register={register} errors={errors} />
        <div className="text-end mb-4 ">
          <Button loading={false}>Save Details</Button>
        </div>
      </form>
    </>
  );
};

// AccountForm.getLayout = getLayout;

export default AccountForm;
