import ABTransition from '@/components/customs/transitions/ABTransition';
import React from 'react';

type Props = {
  children: any;
  hasHoverTransition?: boolean;
};

const PostLayout = ({ children, hasHoverTransition }: Props) => {
  return (
    <ABTransition>
      <article className={`
       product-card cart-type-neon 
       h-full transform 
       overflow-hidden rounded
       border border-border-200 bg-light shadow-sm transition-all duration-200 
      ${hasHoverTransition ? ' hover:-translate-y-0.5' : ''}
       hover:shadow-lg 
       `}>
        {/* <article className="min-h-[300px] product-card cart-type-neon h-full transform overflow-hidden rounded border border-border-200 bg-light shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow "> */}
        <div className='p-4'>
          {children}
        </div>
      </article>
    </ABTransition>
  );
};

export default PostLayout;
