import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
import Home from './feed/[[...pages]]';
import { ROUTES } from '@/lib/routes';
import type { GetServerSideProps } from 'next';
import HomeLayout from '@/components/layouts/_home';
import {
  getAuthCredentials,
  allowedRoles,
  hasAccess,
  isAuthenticated,
} from '@/utils/auth-utils';
import dynamic from 'next/dynamic';
import { ReactElement } from 'react';

const DynamicHome = dynamic(() => import('./feed/[[...pages]]'), {
  ssr: true,
});

const templateVar ={
  "products": {
      "type": "grocery",
      "limit": 30
  },
  "popularProducts": {
      "type_slug": "grocery",
      "limit": 10
  },
  "categories": {
      "type": "grocery",
      "limit": 1000,
      "parent": null
  },
  "types": {
      "type": "grocery"
  }
}

export default function IndexPage({ userPermissions }: any) {
  // console.log('userPermissions', userPermissions);

  const { t } = useTranslation();
  return <><DynamicHome variables={templateVar} layout={"classic"} /> </>;
}

IndexPage.getLayout = function getLayout(page : ReactElement) {
  return <HomeLayout layout={"classic"}>{page}</HomeLayout>;
};


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { locale } = ctx;
  const { token, permissions } = getAuthCredentials(ctx);
  

  if (
    !isAuthenticated({ token, permissions }) ||
    !hasAccess(allowedRoles, permissions)
  ) {
    return {
      redirect: {
        destination: ROUTES.LOGIN,
        permanent: false,
      },
    };
  }
  return {
    props: {
      userPermissions: permissions,
      ...(await serverSideTranslations(locale!, [
        'common',
        'table',
        'widgets',
      ])),
    },
  };
};
