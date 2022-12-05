import { BtnColorClass } from '@/components/ui/buttons/ABbutton'
import React from 'react'

type Props = {
    children?: any
}

const ABContTitle = ({children}: Props) => {
  return (
    <div className={`
    rounded-full
    px-4
    p-2
    w-fit  
    text-white font-thin
    text-center
    text-sm
    ${BtnColorClass.CYAN}
 `}>
   {children}
  </div>
  )
}

export default ABContTitle