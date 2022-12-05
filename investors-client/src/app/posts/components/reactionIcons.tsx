import React from 'react';
import { Image } from '@/components/ui/image';
import ImgBadge from './imageComps/imgBadge';

type Props = {};

const ReactionIcons = (props: Props) => {
  return (
    <>
      {/* <div className="border-b border-dashed border-gray-300 pb-3"></div> */}
      <div className="relative top-4 mb-3 ">

        {/* <div className="pt-5"> */}
        <div className="relative flex gap-4">
          <ImgBadge count={67}>
            <Image
              className=" w-0.5 cursor-pointer"
              src={'/img/heartb.png'}
              alt={'sample'}
              width={35}
              height={35}
            //   layout="responsive"
            />
          </ImgBadge>
          <ImgBadge count={null}>
            <Image
              className=" w-0.5 cursor-pointer"
              src={'/img/like.png'}
              alt={'sample'}
              width={35}
              height={35}
            //   layout="responsive"
            />
          </ImgBadge>
          <ImgBadge count={6}>
            <Image
              className=" w-0.5 cursor-pointer"
              src={'/img/sick.png'}
              alt={'sample'}
              width={35}
              height={35}
            //   layout="responsive"
            />
          </ImgBadge>
        </div>
      </div>
    </>
  );
};

export default ReactionIcons;
