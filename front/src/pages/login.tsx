import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
import { getLayout } from '@/components/layouts/layout';

// import LoginForm from "@components/auth/login-form";
// import Logo from "@components/ui/logo";
// import { ROUTES } from "@utils/routes";
// import { getAuthCredentials, isAuthenticated } from "@utils/auth-utils";
import { useRouter } from 'next/router';
import LoginView from '@/components/auth/login-form';
import Logo from '@/components/ui/logo';

export default function LoginPage() {
  const router = useRouter();
  // const { token, permissions } = getAuthCredentials();
  // if (isAuthenticated({ token, permissions })) {
  //   router.replace(ROUTES.DASHBOARD);
  // }
  const { t } = useTranslation('common');
  return (
    <>
      <div className="flex h-screen items-center justify-center bg-light sm:bg-gray-100">
        <div className="flex h-screen items-center justify-center bg-light sm:bg-gray-100">
          <LoginView />
        </div>
      </div>
    </>
  );
}
// LoginPage.getLayout = getLayout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'faq'])),
    },
  };
};
