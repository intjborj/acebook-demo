
import { useForm } from 'react-hook-form';
import Button from '@admin/components/ui/button';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useTranslation } from 'next-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { accInvestorsValidationSchema, accValidationSchema, accValidationSchemaUpdate } from './formvalidations/acc-validation-schema';
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
import _, { isEmpty } from 'lodash';
import { getAuthCredentials } from "@utils/auth-utils";
import {
  setAuthCredentials,
} from '@/utils/auth-utils';
import { extractObjectId } from '@/services/extractions';
import InvestmentDetails from './investmentDetails';
import { capitalize } from '@/services/getFirstLetters';


type Props = {
  defaultValues?: any;
  isInvestor?: boolean;
}

const AccountForm = ({ defaultValues, isInvestor = false }: Props) => {
  const { token: cookieToken, permissions: cookiePermissions, id: cookieUserId, user: cookieUser } = getAuthCredentials();

  // const AccountForm: NextPageWithLayout = ({defaultValues} : any) => {
  const router = useRouter();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset
  } = useForm<AccFormValues>({
    //@ts-ignore
    defaultValues: defaultValues ?? {},

    resolver: yupResolver(
      isInvestor ? (accInvestorsValidationSchema) :
        (defaultValues ? accValidationSchemaUpdate : accValidationSchema)
    ),
  });



  const [upsertAcc] = useMutation(UPSERT_ACCOUNT);

  const sendData = (payload: any) => {
    if (confirm('Are you sure you want to save user?')) {
      upsertAcc({
        variables: {
          input: payload,
        },
      })
        .then((resp) => {
          if (defaultValues?._id && defaultValues._id === cookieUserId) {
            setAuthCredentials(cookieToken as string, cookiePermissions, cookieUserId, _.get(resp, 'data.registerMU.user'));
            toast.success(t('Session Updated'));
          }

          toast.success(t('Account successfully saved'));
          if (isEmpty(defaultValues)) {
            reset()
          }
        })
        .catch((error) => {
          console.log("error", error)
          toast.error(t('Account failed to save'));
        });
    }
  }

  const investorsInitialization = (payload: AccFormSubmission, values: AccFormValues) => {

    payload.investorDetails = {
      isEmployee: false,
      blocks: values.blocks,
      investorId: values.investorId
    }

    if (values.restrictionCode?.length == 0) {
      payload.restrictionCode = ["POLL_INVESTOR_VOTE_PAGE"]
    }

    if (payload && (payload.blocks && payload.investorId && payload.isEmployee)) {
      delete payload.blocks
      delete payload.investorId
      delete payload.isEmployee
    }

    return payload

  }

  const initializedData = (values: AccFormValues) => {

    let payload: AccFormSubmission | AccFormValues;
    payload = _.cloneDeep(values);

    const deptOnDuty: any = values?.departmentOnDuty?._id;

    payload.firstName = capitalize(payload.firstName)
    payload.lastName = capitalize(payload.lastName)
    payload.middleName = capitalize(payload.middleName)
    payload.department = extractObjectId(values?.department);
    payload.departmentOnDuty = deptOnDuty;
    payload.restrictionCode = _.map(payload.restrictionCode, "code")

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

    if (isInvestor) {
      payload = investorsInitialization(payload as AccFormSubmission, values)
    }

    return payload;

  }

  const onSubmit = async (values: AccFormValues) => {

    let payload = initializedData(values)

    sendData(payload)

  };
  const column = 'auto';
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="pb-12">
        <AccBasicInfo register={register} errors={errors} />

        {
          isInvestor == false &&
          <>
            <BorderDashed />
            <AccEmpInfo isMaster={true} register={register} errors={errors} control={control} watch={watch} />

          </>
        }

        <BorderDashed />
        <ContactInfo register={register} errors={errors} />

        <BorderDashed />
        <AccCredentials isMaster={true} control={control} register={register} errors={errors} autoPassword={true} watch={watch} isUpdate={defaultValues ? true : false} />
        {/* <AccCredentials isMaster={true} control={control} register={register} errors={errors} autoPassword={isInvestor ? true : false} watch={watch} isUpdate={defaultValues ? true : false} /> */}


        {
          isInvestor &&
          <>
            <BorderDashed />
            <InvestmentDetails register={register} errors={errors} />
          </>
        }

        <div className="text-end mb-4 ">
          <Button loading={false}>Save Details</Button>
        </div>
      </form>
    </>
  );
};

// AccountForm.getLayout = getLayout;

export default AccountForm;
