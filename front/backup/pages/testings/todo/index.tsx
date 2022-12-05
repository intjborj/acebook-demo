import type { NextPageWithLayout } from '@/types';
import { getLayout } from '@/components/layouts/layout';
export { getStaticProps } from '@/framework/shops-page.ssr';

const TodoPage: NextPageWithLayout = () => {
  

  return (
   <>
    HELLO
   </>
  );
};
TodoPage.getLayout = getLayout;

export default TodoPage;
