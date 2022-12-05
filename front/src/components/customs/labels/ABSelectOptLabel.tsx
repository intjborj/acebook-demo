import React from 'react'

type Props = {
    children?: string[];
}

const ABSelectOptLabel = ({children}: Props) => {
  return (
    <span className='capitalize'>{children}</span>
  )
}

export default ABSelectOptLabel