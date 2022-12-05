import type { NextPageWithLayout } from '@/types';
import { getLayout } from '@/components/layouts/layout';
import Button from '@/components/ui/button';
import NotFound from '@/components/ui/not-found';
import { useTranslation } from 'next-i18next';
import rangeMap from '@/lib/range-map';
import CouponLoader from '@/components/ui/loaders/coupon-loader';
import { useShops } from '@/framework/shop';
import ErrorMessage from '@/components/ui/error-message';
import ShopCard from '@/components/ui/cards/shop';
import { SHOPS_LIMIT } from '@/lib/constants';
import LabelDescCard from '@/components/ui/cards/labelDescriptionCard';
export { getStaticProps } from '@/framework/shops-page.ssr';
import { gql, useQuery } from '@apollo/client';
import { GET_ALL_DEPTS } from '../../graphql/queries/departments/departmentQueries';
import _ from 'lodash';
import Card from '@admin/components/common/card';
import Search from '@admin/components/common/search';
import LinkButton from '@admin/components/ui/link-button';
import ModClassicLayout from '@/components/layouts/mod-classic';
import HeaderDetails from '@/components/ui/headers/header-details';
import { adminOnly } from '@/utils/auth-utils';
const DeptPage: NextPageWithLayout = () => {
  const { t } = useTranslation('common');
  const limit = SHOPS_LIMIT;

  const { data: alldepts, refetch } = useQuery(GET_ALL_DEPTS, {
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

  const handleSearch = () => {
    console.log('fdsafdsafsd');
  };

  return (
    <ModClassicLayout>
      <>
        <HeaderDetails title={'Departments'} buttonName={'+ New Department'} buttonRoute={"/departments/create"} />

        <Card className=" mb-8 flex  flex-col items-center xl:flex-row">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 ">
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
                    {' '}
                    {_.get(alldepts, 'departments.data').map((d) => (
                      <LabelDescCard data={d} key={d._id} />
                    ))}
                  </>
                ) : (
                  <></>
                )}
              </>
            )}
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
