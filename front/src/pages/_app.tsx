import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { SessionProvider } from 'next-auth/react';
import '@/assets/css/main.css';
// import "@/assets/main.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { ModalProvider } from '@/components/ui/modal/modal.context';
import ManagedModal from '@/components/ui/modal/managed-modal';
import ManagedDrawer from '@/components/ui/drawer/managed-drawer';
import DefaultSeo from '@/components/seo/default-seo';
import { SearchProvider } from '@/components/ui/search/search.context';
import PrivateRoute from '@/lib/private-route';
import { CartProvider } from '@/store/quick-cart/cart.context';
import SocialLogin from '@/components/auth/social-login';
import { NextPageWithLayout } from '@/types';
import QueryProvider from '@/framework/client/query-provider';
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'
import PostProvider from '@/reducers/posts/postProvider';
import PageRestriction from '@/app/restrictions/system/page';

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
function CustomApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);
  const authenticationRequired = Component.authenticationRequired ?? false;
  const authProps = (Component as any).authenticate;
  // const authProps = (Component as any).authenticate;
  return (
    <SessionProvider session={session}>
      <QueryProvider pageProps={pageProps}>
        <SearchProvider>
          <ModalProvider>
            <CartProvider>
              <PostProvider>
                <>
                  <DefaultSeo />
                  {authProps ? (
                    <PrivateRoute authProps={authProps}>

                      {getLayout(
                        <PageRestriction>
                          <Component {...pageProps} />
                        </PageRestriction>
                      )}

                    </PrivateRoute>
                  ) : (
                    getLayout(<Component {...pageProps} />)
                  )
                  }
                  <ManagedModal />
                  <ManagedDrawer />
                  <ToastContainer autoClose={2000} theme="colored" />
                  <SocialLogin />
                </>
              </PostProvider>
            </CartProvider>
          </ModalProvider>
        </SearchProvider>
      </QueryProvider>
    </SessionProvider>
  );
}
export default appWithTranslation(CustomApp);
