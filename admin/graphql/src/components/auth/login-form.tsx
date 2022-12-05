import Alert from "@components/ui/alert";
import Button from "@components/ui/button";
import Input from "@components/ui/input";
import PasswordInput from "@components/ui/password-input";
import { useLoginMutation } from "@graphql/auth.graphql";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useApolloClient } from "@apollo/client";
import { ROUTES } from "@utils/routes";
import { useTranslation } from "next-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { allowedRoles, hasAccess, setAuthCredentials } from "@utils/auth-utils";
import Link from "@components/ui/link";

type FormValues = {
  email: string;
  password: string;
};
const loginFormSchema = yup.object().shape({
  email: yup
    .string()
    .email("form:error-email-format")
    .required("form:error-email-required"),
  password: yup.string().required("form:error-password-required"),
});
const LoginForm = () => {
  const client = useApolloClient();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [login, { loading }] = useLoginMutation({
    onCompleted: (data) => {
      if (data.login?.token) {
        if (hasAccess(allowedRoles, data.login.permissions)) {
          setAuthCredentials(data.login.token, data.login.permissions);
          router.push(ROUTES.DASHBOARD);
          return;
        }
        setErrorMessage("form:error-enough-permission");
      } else {
        setErrorMessage("form:error-credential-wrong");
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
  const { t } = useTranslation();

  function onSubmit({ email, password }: FormValues) {
    client.resetStore();
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhY2Vib2hvbC5hcGlAbWFpbC5jb20iLCJ1c2VybGFzdG5hbWUiOiJBUEkiLCJ1c2VyZXN0YWJsaXNobWVudHV1aWQiOiJiYjg3ODY5Yy1jYzMzLTQ5MTItOTBlNC0xNGJiNDNlODc4YTAiLCJ1c2VyZmlyc3RuYW1lIjoiQWNlIEJvaG9sIiwiaXNzIjoic3Rhc2gucGgiLCJ1c2VybGFzdHBhc3N3b3JkcmVzZXRkYXRlIjoiMTYzNjEwNDYwNTAwMCIsInVzZXJpc2VuYWJsZWQiOiJ0cnVlIiwidXNlcnV1aWQiOiI5Y2U4ZGQ1Yy0wYTJmLTRiYjgtOTIzYS1lOWYzODE2OGU3ZGYiLCJ1c2VyaWQiOiIxMjUyIiwidXNlcnBhc3N3b3JkIjoiJDJhJDEwJFBYNU9XU0VuWEtNTVJEYUk4SVBwLy5WQ1hWNTRZZGhNRlFlalFrLzd2RmwyYmFaUWpvY3JtIiwiYXVkIjoid2ViIiwibmJmIjoxNjUzMzE4NTM1LCJ1c2Vycm9sZXMiOiIxMCxST0xFX0hPU1BJVEFMX1BISUxIRUFMVEhfQURNSU4iLCJ1c2VybWlkZGxlbmFtZSI6IiIsImV4cCI6MTY1MzQwNDkzNSwiaWF0IjoxNjUzMzE4NTM1LCJqdGkiOiI4ZjI1YzExYWUyZjkxMmEyOGUwMTIzNjJkNTA0NTg0MyIsInVzZXJlbWFpbCI6ImFjZWJvaG9sLmFwaUBtYWlsLmNvbSJ9.Os9QrXbXyaZFRiX3U-B6peX87BsIVDGw0JNAxM-yIXIShF92M5VbBeZHc7z_-YtLvXAbc8lK6on48Eg4W0-s3w"
    setAuthCredentials(token, ["super_admin"]);
    router.push(ROUTES.DASHBOARD);
    // login({
    //   variables: {
    //     email,
    //     password,
    //   },
    // });
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          label={t("form:input-label-email")}
          {...register("email")}
          type="email"
          variant="outline"
          className="mb-4"
          error={t(errors?.email?.message!)}
        />
        <PasswordInput
          label={t("form:input-label-password")}
          forgotPassHelpText={t("form:input-forgot-password-label")}
          {...register("password")}
          error={t(errors?.password?.message!)}
          variant="outline"
          className="mb-4"
          forgotPageLink={ROUTES.FORGET_PASSWORD}
        />
        <Button className="w-full" loading={loading} disabled={loading}>
          {t("form:button-label-login")}
        </Button>

        <div className="flex flex-col items-center justify-center relative text-sm text-heading mt-8 sm:mt-11 mb-6 sm:mb-8">
          <hr className="w-full" />
          <span className="absolute start-2/4 -top-2.5 px-2 -ms-4 bg-light">
            {t("common:text-or")}
          </span>
        </div>

        <div className="text-sm sm:text-base text-body text-center">
          {t("form:text-no-account")}{" "}
          <Link
            href={ROUTES.REGISTER}
            className="ms-1 underline text-accent font-semibold transition-colors duration-200 focus:outline-none hover:text-accent-hover focus:text-accent-700 hover:no-underline focus:no-underline"
          >
            {t("form:link-register-shop-owner")}
          </Link>
        </div>

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

export default LoginForm;
