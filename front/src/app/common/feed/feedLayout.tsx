import React from 'react'

type Props = {
    children: JSX.Element[] ;
}

const FeedPostLayout = ({children}: Props) => {
  return (
    <div className='mb-10'>{children}</div>
  )
}

export default FeedPostLayout