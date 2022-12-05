import React from 'react';
import Avatar from '@/components/ui/avatar';
import _ from 'lodash';
import PostTime from '@/app/posts/components/postTime';
import { ProfilePicUploadPath } from '@/constants/uploadPaths';
import { fileImport } from '@/services/fileManangement';
import Avatar2 from '@/components/ui/avatar2';
type Props = {
  firstName?: any;
  lastName?: any;
  created_at?: any;
  profilePicture?: any;
  userId?: any;
};

const CommentedByDetails = ({ firstName, lastName, created_at, profilePicture, userId }: Props) => {
// console.log("otlum", fileImport({ type: "profile", fileName: ProfilePicUploadPath({fileName:  profilePicture, id: userId}) }))
  return (
    <div>
      <div className=" flex items-center space-x-3">
       { ProfilePicUploadPath({fileName:  profilePicture, id: userId}) &&
        <Avatar
          fileName={ProfilePicUploadPath({fileName:  profilePicture, id: userId})}
          // fileName={fileImport({ type: "profile", fileName: ProfilePicUploadPath({fileName:  profilePicture, id: userId}) })}
          // fileName={profilePicture}
          // src={ profilePicture ? `/uploads/profiles/${profilePicture}` :  '/_next/static/media/avatar.c9441dc8.svg'}
          title="user name"
          className="h-7 w-7"
        />
        // <></>
        }

        <div>
          <div className='flex relative w-full'>
            <span className="text-sm font-semibold capitalize">
              {firstName} {lastName}
            </span>
            <div className='pl-2 '> <div className='absolute bottom-0 w-full'><PostTime created_at={created_at} /></div></div>  
          </div>

        </div>
      </div>
    </div>
  );
};

export default CommentedByDetails;
