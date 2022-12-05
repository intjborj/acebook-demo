import React from 'react';
import { Image } from '@/components/ui/image';
import ImgPostLayout from './imageComps/imgPostLayout';
import { Swiper, SwiperSlide, Navigation } from '@/components/ui/slider';
import { ArrowNext, ArrowPrev } from '@/components/icons';
import { UPLOAD_LINK } from '@/constants/uploads';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import ImageView from '@/components/attachments/imageView';

type Props = {
  attachments?: any;
};
// === do not remove ===
// const offerSliderBreakpoints = {
//   320: {
//     slidesPerView: 1,
//     spaceBetween: 0,
//   },
//   580: {
//     slidesPerView: 2,
//     spaceBetween: 16,
//   },
//   1024: {
//     slidesPerView: 3,
//     spaceBetween: 16,
//   },
//   1920: {
//     slidesPerView: 4,
//     spaceBetween: 24,
//   },
// };
// === do not remove ===

const PostImageContent = ({ attachments }: Props) => {
  return (
    <div className=" object-center pt-2 pb-2">
      <div className="relative">
        <Swiper
          id="POST"
          modules={[Navigation]}
          slidesPerView={attachments.length == 1 ? 1 : 2}
          spaceBetween={16}
        // navigation
        // pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
        // navigation={{
        //   nextEl: '.next',
        //   prevEl: '.prev',
        // }}

        >
          <div className='bg-slate-200 h-full'>
            {attachments.map((i: any, index: number) => (
              <SwiperSlide key={index}>

                <div className='flex  justify-center  content-center'>
                  <div className='max-w-sm  max-h-[30rem]   rounded-lg object-cover object-center  aspect-auto'>

                    {/* <img
                      key={index}
                      className=" rounded-lg object-cover object-center "
                      src={UPLOAD_LINK('images', i.path)}
                      alt="new"
                    /> */}

                    
                    <ImageView index={index} className='rounded-lg object-cover object-center' fileName={'images/'+i.path} />


                  </div>
                </div>

              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default PostImageContent;
