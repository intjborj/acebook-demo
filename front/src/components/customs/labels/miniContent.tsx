import React from 'react'

type Props = {
    children?: string[]
}

const MiniCont = ({children}: Props) => {
  return (
    <span className='capitalize text-sm md:text-md text-gray-500'>{children}</span>
  )
}

export default MiniCont