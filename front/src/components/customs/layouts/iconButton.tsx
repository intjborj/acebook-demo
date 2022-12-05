import React from 'react'

export type IconBtnProps = {
    children?: any
    hoverSkew?: boolean;
    hoverShadow?: boolean;
    colorShadow?: string | null
}

const IconButtonLayout = ({children, hoverSkew=true, hoverShadow=false, colorShadow}: IconBtnProps) => {
  return (
    <div className={`w-6 bg-slate-300 p-1 rounded text-slate-500 cursor-pointer 
    ${hoverSkew ?'hover:skew-y-3' : ''}
    ${hoverShadow ?'hover:drop-shadow-lg' : ''}
    ${colorShadow ?? ''}
    
    `}>{children}</div>
  )
}

export default IconButtonLayout