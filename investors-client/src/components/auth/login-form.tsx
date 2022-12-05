// import Alert from "@components/ui/alert";
// import Button from "@components/ui/button";
// import Input from "@components/ui/input";
// import PasswordInput from "@components/ui/password-input";
// import { useLoginMutation } from "@graphql/auth.graphql";
import PasswordInput from '@/components/ui/forms/password-input';
import Alert from '@/components/ui/alert';
import Input from '@/components/ui/forms/input';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useApolloClient } from '@apollo/client';
// import { ROUTES } from "@utils/routes";
import { useTranslation } from 'next-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// import { allowedRoles, hasAccess, setAuthCredentials } from "@utils/auth-utils";
// import Link from "@components/ui/link";
import Logo from '../ui/logo';
import { useLoginMutation } from 'graphql/auth.graphql';
import {
  allowedRoles,
  hasAccess,
  setAuthCredentials,
} from '@/utils/auth-utils';
import Button from '@/components/ui/button';
import { ROUTES } from '@/lib/routes';
import _ from 'lodash';
import BorderDashed from '../ui/border';
import AuthLayout from '../layouts/auths/authLayout';
import Link from 'next/link';

type FormValues = {
  username: string;
  password: string;
};
const loginFormSchema = yup.object().shape({
  username: yup
    .string()
    // .email("form:error-email-format")
    .required('Username is required'),
  password: yup.string().required('Password id Required'),
});
const LoginForm = () => {
  const client = useApolloClient();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [login, { loading }] = useLoginMutation({
    onCompleted: (data) => {
      if (data.login?.token) {

        // if (hasAccess(allowedRoles, data.login.permissions)) {
        if (hasAccess(data.login.permissions, _.get(data, 'login.user.restrictionCode'))) {
          setAuthCredentials(data.login.token, _.get(data, 'login.user.restrictionCode'), data.login._id, _.get(data, 'login.user'));
          // setAuthCredentials(data.login.token, data.login.permissions, data.login._id, _.get(data, 'login.user'));
          router.push(ROUTES.HOME);
          return;
        }
        setErrorMessage('Premission Issues');
      } else {
        setErrorMessage('Credential Issues');
      }
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(loginFormSchema),
  });
  const router = useRouter();
  const { t } = useTranslation('common');

  function onSubmit({ username, password }: FormValues) {
    client.resetStore();
    login({
      variables: {
        username,
        password,
      },
    });
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          label={t('Username')}
          {...register('username')}
          type="text"
          variant="outline"
          className="mb-4"
          error={t(errors?.username?.message!)}
        />
        <PasswordInput
          label={t('text-password')}
          // forgotPassHelpText={t("form:input-forgot-password-label")}
          {...register('password')}
          error={t(errors?.password?.message!)}
          variant="outline"
          className="mb-4"
        // forgotPageLink={ROUTES.FORGET_PASSWORD}
        />
        <Button className="w-full bg-teal-800 shadow-300" loading={loading} disabled={loading}>
          {t('text-login')}
        </Button>


        {errorMessage ? (
          <Alert
            message={t(errorMessage)}
            variant="error"
            closeable={true}
            className="mt-5"
            onClose={() => setErrorMessage(null)}
          />
        ) : null}
      </form>
    </>
  );
};
export default function LoginView() {
  const { t } = useTranslation('common');
  return (
    <>
      <AuthLayout>

        {/* <p className="mt-4 mb-8 text-center text-sm text-body sm:mt-5 sm:mb-10 md:text-base">
        {t('login-helper')}
      </p> */}
        <LoginForm />
        <div className='pt-5'>
          <BorderDashed />
        </div>
        <div className='pt-5'>

          {/* <Link href={'/investor/registration/checker'}> */}
          <div className=' flex gap-3 w-full px-8 justify-center'>
            <Link href={'/investor/registration'}>
              <Button className="w-1/2 bg-teal-600" >
                Register
              </Button>
            </Link>
            <Link href={'/investor/forgot-password'}>
              <Button className="w-1/2 bg-teal-600" >
                Reset Password
              </Button>
            </Link>
          </div>


        </div>


      </AuthLayout>
    </>
  );
}
