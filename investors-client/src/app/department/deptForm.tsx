import Input from '@admin/components/ui/input';
import { Control, FieldErrors, useForm } from 'react-hook-form';
import Button from '@admin/components/ui/button';
import TextArea from '@admin/components/ui/text-area';
import Label from '@admin/components/ui/label';
// import { useTypesQuery } from "@graphql/type.graphql";
import Card from '@/components/common/card';
import Description from '@admin/components/ui/description';
import * as categoriesIcon from '@/components/icons/category';
import { getIcon } from '@/utils/get-icon';
import { useRouter } from 'next/router';
// import { ROUTES } from "@utils/routes";
import { getErrorMessage } from '@/utils/form-error';
import ValidationError from '@admin/components/ui/form-validation-error';
import { toast } from 'react-toastify';
// import { tagIcons } from "./tag-icons";
import { useTranslation } from 'next-i18next';
import FileInput from '@admin/components/ui/file-input';
// import SelectInput from "@components/ui/select-input";
import { yupResolver } from '@hookform/resolvers/yup';
import { getFormattedImage } from '@/utils/get-formatted-image';
import { getLayout } from '@/components/layouts/layout';
// import {
//   useCreateTagMutation,
//   useUpdateTagMutation,
// } from "@graphql/tags.graphql";
import { tagValidationSchema } from './formvalidations/tag-validation-schema';
// import { tagValidationSchema } from "./tag-validation-schema";
import { Tag } from '__generated__/__types__';
import { NextPageWithLayout } from '@/types';
import { gql, useMutation } from '@apollo/client';
import {UPSERT_DEPARTMENT} from '@graphql/operations/departments/departmentMutations'

type FormValues = {
  deptName: string;
  description: string;
};

const defaultValues = {
  deptName: '',
  description: '',
};

type IProps = {
  initialValues?: null;
};

const DepartmentForm: NextPageWithLayout = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    //@ts-ignore
    defaultValues: defaultValues,

    resolver: yupResolver(tagValidationSchema),
  });
  const [upsertDept] = useMutation(UPSERT_DEPARTMENT);

  const onSubmit = async (values: FormValues) => {
    const input = {
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
        })
        .catch((error) => {});
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <form onSubmit={handleSubmit(onSubmit)}> */}
        {/* <div className="my-5 flex flex-wrap border-b border-dashed border-gray-300 pb-8 sm:my-8"> */}
        {/* <Description
            title={t('form:input-label-image')}
            details={t('form:tag-image-helper-text')}
            className="sm:pe-4 md:pe-5 w-full px-0 pb-5 sm:w-4/12 sm:py-8 md:w-1/3"
          />

          <Card className="w-full sm:w-8/12 md:w-2/3">
            <FileInput name="image" control={control} multiple={false} />
          </Card>
        </div> */}

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
