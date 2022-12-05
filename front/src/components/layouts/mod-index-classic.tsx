import Banner from '@/components/banners/banner';
import PromotionSliders from '@/components/promotions/promotions';
import Categories from '@/components/categories/categories';
import { Element } from 'react-scroll';
// import FilterBar from './filter-bar';
import ProductGridHome from '@/components/products/grids/home';
import type { HomePageProps } from '@/types';
import { getLayout } from '@/components/layouts/layout';
import { breadcrumbType } from '@/types/custom';
import FilterBar from './filter-bar';

type Props = {
  children: JSX.Element;
  breadcrumb?: Array<breadcrumbType>;
};

const variables = {
  type: 'grocery',
}

function ModIndexClassicLayout({ children}: Props) {
  return (
    <>
      {/* <Banner
        layout="classic"
        variables={variables}
      /> */}
      {/* <PromotionSliders
        variables={variables}
      /> */}
      {/* <FilterBar variables={variables} /> */}
      <Element
        name="grid"
        className="flex border-t border-solid border-border-200 border-opacity-70 "
        // className="flex border-t border-solid border-border-200 border-opacity-70"
      >
        <Categories
          layout="classic"
          variables={{
            type: 'grocery',
            limit: 1000,
            parent: null,
          }}
        />

        <div className="w-full">
          <div className="bg-gray mx-1 md:mx-14 ">
          {/* <div className="bg-gray mx-6 md:mx-14 "> */}

            <div className="bg-gray min-h-screen  ">
              <div className="mx-auto flex  md:w-7/12 max-w-none flex-col  pt-3 object-center">
              {/* <div className="mx-auto flex w-full max-w-none flex-col  pt-3"> */}
            
                {children}
              </div>
            </div>

          </div>
        </div>

        {/* <ProductGridHome
          className="px-4 pb-8 lg:p-8"
          // className="px-4 pb-8 lg:p-8"
          variables={{
            type: 'grocery',
            limit: 30,
          }}
        /> */}
      </Element>
    </>
  );
}

ModIndexClassicLayout.getLayout = getLayout;

export default ModIndexClassicLayout;
