// Dependecies
import _ from 'lodash';
import { gql, useQuery } from '@apollo/client';
// Hooks
export { getStaticProps } from '@/framework/shops-page.ssr';
import { useTranslation } from 'next-i18next';
// Constants
import type { NextPageWithLayout } from '@/types';
import { adminOnly } from '@/utils/auth-utils';
import { GET_ALL_DEPTS } from '@graphql/operations/departments/departmentQueries';
import { SHOPS_LIMIT } from '@/lib/constants';
// Global Components
import Button from '@/components/ui/button';
import NotFound from '@/components/ui/not-found';
import { getLayout } from '@/components/layouts/layout';
import rangeMap from '@/lib/range-map';
import CouponLoader from '@/components/ui/loaders/coupon-loader';
import { useShops } from '@/framework/shop';
import ErrorMessage from '@/components/ui/error-message';
import LabelDescCard from '@/components/ui/cards/labelDescriptionCard';
import Card from '@admin/components/common/card';
import ModClassicLayout from '@/components/layouts/mod-classic';
import HeaderDetails from '@/components/ui/headers/header-details';
import { FrontPath } from '@/constants/enums/paths';

const DeptPage: NextPageWithLayout = () => {
  const { t } = useTranslation('common');
  const limit = SHOPS_LIMIT;

  let queryVar : any = {
    "searchArg": null
  }

  const { data: alldepts, refetch } = useQuery(GET_ALL_DEPTS, {
    variables: queryVar,
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first"
  });


  const { shops, isLoading, isLoadingMore, hasMore, loadMore, error } =
    useShops({
      limit,
      is_active: 1,
    });
  if (error) return <ErrorMessage message={error.message} />;
  if (!isLoading && !shops.length) {
    return (
      <div className="min-h-full bg-gray-100 px-4 pt-6 pb-8 lg:p-8">
        <NotFound text="text-no-shops" />
      </div>
    );
  }

  const getSearchInput = (data: any) => {
    if (data.searchText && data.searchText != '') {
      refetch({
        "searchArg": {
          "isSearch": true,
          "description": data?.searchText
        }
      })
    }else{
      refetch({
        "searchArg": null
      })
    }
  }

  return (
    <ModClassicLayout>
      <>
        <HeaderDetails  searchInput={getSearchInput} title={'Departments'} buttonName={'+ New Department'} buttonRoute={"/departments/create"} />

        <Card className=" mb-8 flex  flex-col items-center xl:flex-row">
          {/* <div className="grid grid-flow-col auto-cols-max gap-2"> */}
          <div className='flex justify-center'>
            <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8 gap-2">
              {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"> */}

              {isLoading && !shops.length ? (
                <>
                  {rangeMap(limit, (i) => (
                    <CouponLoader key={i} uniqueKey={`shops-${i}`} />
                  ))}
                </>
              ) : (
                <>
                  {_.get(alldepts, 'departments.data') ? (
                    <>
                      {_.get(alldepts, 'departments.data').map((item: any) => (
                        <LabelDescCard data={item} key={item._id} editPath={`${FrontPath.DEPARTMENT_UPDATE}/${item._id}`} />
                      ))}
                    </>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </div>
          </div>
        </Card>
        {hasMore && (
          <div className="mt-8 flex items-center justify-center lg:mt-12">
            <Button onClick={loadMore} loading={isLoadingMore}>
              {t('text-load-more')}
            </Button>
          </div>
        )}
      </>
    </ModClassicLayout>
  );
};
DeptPage.getLayout = getLayout;
DeptPage.authenticate = {
  permissions: adminOnly,
};

export default DeptPage;
