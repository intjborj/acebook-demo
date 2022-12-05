import useLayout from '@/lib/hooks/use-layout';
import Header from './header';
import HeaderMinimal from './header-minimal';
import MobileNavigation from './mobile-navigation';
import Footer from './footer';
import React, { useEffect } from 'react';
import SmallLoader from '../ui/loaders/smallLoader';
import ABTransition from '../customs/transitions/ABTransition';
export default function SiteLayout({ children }: React.PropsWithChildren<{}>) {
  const { layout } = useLayout();
  // const MobileNavigation = React.lazy(() => import('./mobile-navigation'));
  return (
    <div className="flex min-h-screen flex-col bg-gray-100 transition-colors duration-150">
      {['minimal', 'compact'].includes(layout) ? (
        <HeaderMinimal layout={layout} />
      ) : (
        <Header layout={layout} />
      )}
      {children}
      {['compact'].includes(layout) && <Footer />}

      {/* <Suspense fallback={<SmallLoader />}> */}
        {
          <MobileNavigation />
        }

      {/* </Suspense> */}
    </div>
  );
}
export const getLayout = (page: React.ReactElement) => (
  <SiteLayout>{page}</SiteLayout>
);


