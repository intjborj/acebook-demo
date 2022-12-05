import React from 'react';
import ReactTimeAgo from 'react-time-ago'

type Props = {
  withTime?: boolean;
  created_at?: string | null;
};

const PostTime = ({ withTime, created_at }: Props) => {
  //
  return (
    <div>
          
              <span className="text-[10px] text-body">
                {/* {} */}
                <ReactTimeAgo date={created_at} locale="en-US"/>
                {/* Jan. 15, 2022 - 6:00 PM */}
              </span>
            
    </div>
  );
};

export default PostTime;
