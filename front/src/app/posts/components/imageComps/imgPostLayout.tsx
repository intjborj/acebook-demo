import React from 'react';

type Props = {
  children: any;
};

const ImgPostLayout = ({ children }: Props) => {
  return (
    <div className="h-96 ">
    {/* <div className="h-96"> */}
      <div className="relative h-full p-1 md:p-2  ">{children} </div>
      {/* <div className="relative h-full w-full p-1 md:p-2  ">{children} </div> */}
    </div>
  );
};

export default ImgPostLayout;
