import React from 'react'

type Props = {
    children?: string
}

const SectionHeader = ({children}: Props) => {
  return (
    <h1 className=" text-md font-extrabold text-gray-900 dark:text-white md:text-md ">{children}</h1>
)
}

export default SectionHeader