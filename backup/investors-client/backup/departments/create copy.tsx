
import { getLayout } from '@/components/layouts/layout';
import { NextPageWithLayout } from "@/types";
import HomeLayout from '@/components/layouts/_home';
import { InferGetStaticPropsType } from 'next';
import { getStaticPaths, getStaticProps } from '@/framework/home-pages.ssr';
import { scroller } from 'react-scroll';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const Classic = dynamic(() => import('@/components/layouts/classic'));
const Standard = dynamic(() => import('@/components/layouts/standard'));
const Modern = dynamic(() => import('@/components/layouts/modern'));
const Minimal = dynamic(() => import('@/components/layouts/minimal'));
const Compact = dynamic(() => import('@/components/layouts/compact'));

const MAP_LAYOUT_TO_GROUP: Record<string, any> = {
  classic: Classic,
  modern: Modern,
  standard: Standard,
  minimal: Minimal,
  compact: Compact,
  default: Classic,
};

const CreateDeptPage: NextPageWithLayout<
InferGetStaticPropsType<typeof getStaticProps>
> = ({ variables, layout }) => {

  // const { width } = useWindowSize();

  useEffect(() => {
   
      scroller.scrollTo('grid', {
        smooth: true,
        offset: -110,
      });
  
  }, []);

  const Component = MAP_LAYOUT_TO_GROUP[layout];
  return (
    <>

      <Component variables={variables} />
      CREATE DEPT FORM
    </>
  );
}

// CreateDeptPage.getLayout = getLayout;
CreateDeptPage.getLayout = function getLayout(page) {
  return <HomeLayout layout={page.props.layout}>HFGDHGFHGFD</HomeLayout>;
  // return <HomeLayout layout={page.props.layout}>{page}</HomeLayout>;
};

export default CreateDeptPage;
