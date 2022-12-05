import DrawerWrapper from '@/components/ui/drawer/drawer-wrapper';
import Categories from '@/components/categories/categories';
import React from 'react'
import SmallLoader from '@/components/ui/loaders/smallLoader';
// const Categories = React.lazy(() => import('@/components/categories/categories'));

export default function MobileCategoryMenu({ variables }: { variables: any }) {
  return (
    <DrawerWrapper>
      <div className="h-full max-h-full">
        {/* <Suspense fallback={<div className='flex justify-center pt-2'> <SmallLoader /></div>}> */}
          <Categories layout="classic" className="!block" variables={variables} />
        {/* </Suspense> */}
      </div>
    </DrawerWrapper>
  );
}
