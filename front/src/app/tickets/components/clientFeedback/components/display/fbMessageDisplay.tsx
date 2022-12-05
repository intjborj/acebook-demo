import React from 'react'
import { ContainerBgColor, LabelColor } from '@/constants/enums/themes';

type Props = {
    message?: string
}

const FbMessageDisplay = ({message}: Props) => {
  return (
    <div className={`${ ContainerBgColor.PRIMARY} ${ LabelColor.PRIMARY} rounded-lg p-2 text-sm`}>{message}</div>
  )
}

export default FbMessageDisplay