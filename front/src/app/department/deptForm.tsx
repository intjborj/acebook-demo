// Dependencies
import {  useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@apollo/client';
// Hooks
import { useTranslation } from 'next-i18next';
// Global Components
import Input from '@admin/components/ui/input';
import Button from '@admin/components/ui/button';
import TextArea from '@admin/components/ui/text-area';
import Card from '@/components/common/card';
import Description from '@admin/components/ui/description';
import { getLayout } from '@/components/layouts/layout';
// Constants
import { tagValidationSchema } from './formvalidations/tag-validation-schema';
import { NextPageWithLayout } from '@/types';
import {UPSERT_DEPARTMENT} from '@graphql/operations/departments/departmentMutations'
import { isEmpty } from 'lodash';

type FormValues = {
  _id: string;
  deptName?: string;
  description?: string;
};


type Props = {
  defaults?: FormValues | null;
};
const defaultValues = {
  deptName: '',
  description: '',
};



const DepartmentForm= ({defaults}:Props) => {
// const DepartmentForm: NextPageWithLayout = ({}:Props) => {
  const router = useRouter();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm<FormValues>({
    //@ts-ignore
    defaultValues: defaults ?? defaultValues,

    resolver: yupResolver(tagValidationSchema),
  });
  const [upsertDept] = useMutation(UPSERT_DEPARTMENT);

  const onSubmit = async (values: FormValues) => {
    const input = {
      _id: defaults ? defaults._id : null,
      name: values.deptName,
      description: values.description,
    };
    if (confirm('Are you sure you want to add department?')) {
      upsertDept({
        variables: {
          input: input,
        },
      })
        .then((resp) => {
          toast.success(t('Department successfully saved'));
          if(isEmpty(defaults)){
            reset()
          }
        })
        .catch((error) => {});
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="my-5 flex flex-wrap sm:my-8">
          <Description
            title={'Description'}
            details={
              'Add department details and necessary information from here'
            }
            className="sm:pe-4 md:pe-5 w-full px-0 pb-5 sm:w-4/12 sm:py-8 md:w-1/3 "
          />

          <Card className="w-full sm:w-8/12 md:w-2/3">
            <Input
              label={'Department Name'}
              {...register('deptName')}
              error={t(errors.deptName?.message!)}
              variant="outline"
              className="mb-5"
            />

            <TextArea
              label={'Description'}
              {...register('description')}
              variant="outline"
              className="mb-5"
            />
            <div className="text-end mb-4">
              <Button loading={false}>Save Details</Button>
            </div>
          </Card>
        </div>
      </form>
    </>
  );
};

DepartmentForm.getLayout = getLayout;

export default DepartmentForm;
