import cn from 'classnames';
import { Image } from '@/components/ui/image';
import React from 'react'

import { fileImport } from '@/services/fileManangement';
import { DEFAULT_IMAGE } from '@/constants/image';
import { ProfilePicUploadPath } from '@/constants/uploadPaths';
import { getAuthCredentials } from "@utils/auth-utils";

type AvatarProps = {
  className?: string;
  src?: string;
  title: string;
  fileName?: string;
  [key: string]: unknown;
};

const Avatar: React.FC<AvatarProps> = ({ src, className, title, fileName, ...rest }) => {
  const { user } = getAuthCredentials();
  const [imgerror, setImgerror] = React.useState<boolean>(false)


  return (
    <>
      <div
        className={cn(
          'relative cursor-pointer overflow-hidden rounded-full border border-border-100',
          className
        )}
        {...rest}
      >
        {/* {
        imgerror == false && */}
  
      { fileName && 
      <Image
          alt={''}
          // alt={title}   
          // onError={() => setImgerror(true) }
          src={src ?? fileName} layout="fill" priority={true} />
          // src={src ?? fileImport({ type: "profile", fileName: fileName })} layout="fill" priority={true} />
        }


        {/* // src={src ?? (imgerror ? DEFAULT_IMAGE : fileImport({ type: "profile", fileName: fileName }))} layout="fill" priority={true} /> */}
        {/* src={src ?? (imgerror ? DEFAULT_IMAGE : fileImport({ type: "profile", fileName: 'profiles/' + fileName }))} layout="fill" priority={true} /> */}
        {/* } */}
        {/* src={src ?? (imgerror ? DEFAULT_IMAGE : fileImport({ type: "profile", fileName: 'profiles/'+fileName }))} layout="fill" priority={true} /> */}
        {/* <Image alt={title} src={src} layout="fill" priority={true} /> */}
      </div>
    </>
  );
};

export default Avatar;
