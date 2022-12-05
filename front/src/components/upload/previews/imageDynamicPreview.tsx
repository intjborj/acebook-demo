import ImageClick from '@/components/customs/modals/imageClickModal';
import { XCircleIcon } from '@/components/icons/xcircle-icon';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

type Props = {
    attachment: any;
    triggerRemove?: any;
    imageClass?: string;
}

const ImageDynamicPreview = ({ attachment, triggerRemove, imageClass }: Props) => {
    const [image, setImage] = useState("")

    useEffect(() => {
        if (attachment) {
            const inptImage = attachment
            var file = inptImage;
            var reader = new FileReader();
            var url = reader.readAsDataURL(file);

            reader.onloadend = function (e) {
                if (reader.result) {
                    setImage(reader.result as any)
                }
            };

        }
    }, [attachment])



    return (
        <>
            {
                image && <div className='relative m-3'>
                    <div className=' absolute w-5 z-[5] h-5 pt-1 pr-1 right-0 cursor-pointer' onClick={e => triggerRemove && triggerRemove(attachment.name)}><XCircleIcon /></div>
                    <ImageClick image={image}>
                        <img
                            className={` relative rounded drop-shadow-md bg-slate-50 ${imageClass ?? 'w-full h-full'}`}
                            // className='w-full h-full relative rounded drop-shadow-md bg-slate-50'
                            src={image}
                        />
                    </ImageClick>
                    {/* <img className=' absolute w-20 h-20 z-0 rounded drop-shadow-md bg-slate-50' src={image} /> */}
                </div>
            }

        </>
    )
}

export default ImageDynamicPreview