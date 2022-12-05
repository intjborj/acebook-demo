import React from 'react'

type Props = {
    children?: string
}

const LabelShort = ({children}: Props) => {
  return (
    <h1 className=" text-xs font-bold text-gray-900  md:text-sm ">{children}</h1>
  )
}

export default LabelShort