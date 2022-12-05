import Image from 'next/image'
import React from 'react'
import { DEFAULT_IMAGE } from '@/constants/image';
import ImageDynamicPreview from '@/components/upload/previews/imageDynamicPreview';
import { fileImport } from '@/services/fileManangement';

type Props = {
  fileName?: string
}

const PromoImage = ({ fileName }: Props) => {
  const [imgerror, setImgerror] = React.useState<boolean>(false)
  return (
    <div className='flex justify-center'>
      <img
        onError={() => setImgerror(true)}
        className='object-cover h-48 w-96 drop-shadow-lg rounded-lg'
        // layout='responsive'
        src={imgerror ? DEFAULT_IMAGE : fileImport({ type: "post", fileName: fileName })}
      // width="100"
      // height={"100"}
      />
      {/* <ImageDynamicPreview/> */}
    </div>
  )
}

export default PromoImage