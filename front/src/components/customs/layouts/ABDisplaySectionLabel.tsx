import React from 'react'
// Constants
import { LabelColor } from '@/constants/enums/themes';

type Props = {
    children?: string;
}

const ABDisplaySectionLabel = ({children}: Props) => {
  return (
    <h1 className={`mb-2 text-sm font-extrabold  dark:text-white md:text-md ${LabelColor.PRIMARY_HEADING} `}>{children}</h1>
  )
}

export default ABDisplaySectionLabel