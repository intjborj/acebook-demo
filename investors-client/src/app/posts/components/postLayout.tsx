import React from 'react';

type Props = {
  children: any;
};

const PostLayout = ({ children }: Props) => {
  return (
      <article className=" product-card cart-type-neon h-full transform overflow-hidden rounded border border-border-200 bg-light shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow ">
      {/* <article className="min-h-[300px] product-card cart-type-neon h-full transform overflow-hidden rounded border border-border-200 bg-light shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow "> */}
        <div className='p-4'>
            {children}
        </div>
      </article>
  );
};

export default PostLayout;
