import React from 'react'

type Props = {
    children?: string;
}

const WorkSectionHeader = ({children}: Props) => {
  return (
    <h1 className="mb-2 text-sm font-extrabold text-gray-900 dark:text-white md:text-md ">{children}</h1>
  )
}

export default WorkSectionHeader