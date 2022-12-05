import { XCircleIcon } from '@/components/icons/xcircle-icon';
import React, { useEffect, useState } from 'react'

type Props = {
    attachment: any;
    triggerRemove?: any;
}

const ImagePreview = ({ attachment, triggerRemove }: Props) => {
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
        // <div className='bg-slate-200 w-20 h-20 rounded px-4'>
        <>
                {
                    image && <div className='relative'>
                        <div className=' absolute w-5 z-[5] h-5 pt-1 pr-1 right-0 cursor-pointer' onClick={e => triggerRemove && triggerRemove(attachment.name)}><XCircleIcon /></div>
                        <img className=' w-20 h-20  relative rounded drop-shadow-md bg-slate-50' src={image} />
                        {/* <img className=' absolute w-20 h-20 z-0 rounded drop-shadow-md bg-slate-50' src={image} /> */}
                    </div>
                }
           
        </>

        // </div>
    )
}

export default ImagePreview