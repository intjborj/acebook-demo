import React from 'react'
import { fileImport } from '@/services/fileManangement';
import { DEFAULT_IMAGE } from '@/constants/image';

type Props = {
    index?: number;
    className?: string;
    src?: string;
    fileName?: string;
}

const ImageView = ({index, className, src, fileName}: Props) => {
    const [imgerror, setImgerror] = React.useState<boolean>(false)
  return (
    <div>
    <img
    key={index}
    className={className ?? ''}
    onError={() => setImgerror(true)}
    src={src ?? (imgerror ? DEFAULT_IMAGE : fileImport({ type: "post", fileName: fileName }))}
    // src={src ?? (UPLOAD_LINK('images', i.path))}
    alt="new"
  />
  </div>
  )
}

export default ImageView