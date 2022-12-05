import React from 'react';
import Avatar from '@/components/ui/avatar';
import _ from 'lodash';
import PostTime from '@/app/posts/components/postTime';
type Props = {
  firstName?: any;
  lastName?: any;
  created_at?: any;
  profilePicture?: any;
};

const CommentedByDetails = ({ firstName, lastName, created_at, profilePicture }: Props) => {

  return (
    <div>
      <div className=" flex items-center space-x-3">
        <Avatar
          fileName={profilePicture}
          // src={ profilePicture ? `/uploads/profiles/${profilePicture}` :  '/_next/static/media/avatar.c9441dc8.svg'}
          title="user name"
          className="h-7 w-7"
        />
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
