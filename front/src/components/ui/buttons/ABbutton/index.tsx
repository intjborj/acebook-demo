import React, { Component } from 'react'
import { ArrowDownIcon } from '@/components/icons/arrow-down';

export enum ButtonCategory {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  DANGER = "failed",
  SUCCESS = "success",
  NORMAL = "normal",
}
export enum BtnType {
  BUTTON = "button",
  SUBMIT= "submit",
  RESET = "reset"
}
export enum BtnColorClass {
  PRIMARY = "shadow-teal-500/50 bg-gradient-to-r from-teal-500 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:shadow-teal-700/70 focus:ring-teal-300  dark:focus:ring-teal-800 ",
  SECONDARY = "shadow-blue-500/50  bg-gradient-to-r from-blue-500 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:shadow-blue-700/70 focus:ring-blue-300 dark:focus:ring-blue-800 ",
  DANGER = "shadow-rose-500/50  bg-gradient-to-r from-rose-500 via-rose-500 to-rose-600 hover:bg-gradient-to-br focus:shadow-rose-700/70 focus:ring-rose-300 dark:focus:ring-rose-800 ",
  SUCCESS = "shadow-green-500/50  bg-gradient-to-r from-green-500 via-green-500 to-green-600 hover:bg-gradient-to-br focus:shadow-green-700/70 focus:ring-green-300 dark:focus:ring-green-800 ",
  NORMAL = "shadow-slate-500/50  bg-gradient-to-r from-slate-500 via-slate-500 to-slate-600 hover:bg-gradient-to-br focus:shadow-slate-700/70 focus:ring-slate-300 dark:focus:ring-slate-800 ",
  CYAN = "shadow-cyan-500/50  bg-gradient-to-r from-cyan-500 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:shadow-cyan-700/70 focus:ring-cyan-300 dark:focus:ring-cyan-800 ",
  INDIGO = "shadow-indigo-500/50  bg-gradient-to-r from-indigo-500 via-indigo-500 to-indigo-600 hover:bg-gradient-to-br focus:shadow-indigo-700/70 focus:ring-indigo-300 dark:focus:ring-indigo-800 ",
}
type Props = {
  text?: string;
  children?: any;
  // children?: string;
  isDropdown?: boolean;
  onClick?: any;
  category?: ButtonCategory | string;
  className?: string;
  type?: BtnType | string;
  height?: string;
}



const ABButton = ({ children = "Button", isDropdown, onClick, category, className , height, type}: Props) => {
  const emptyClick = () => {
  }

  let buttonColor = BtnColorClass.PRIMARY
  switch (category) {
    case ButtonCategory.PRIMARY:
      buttonColor = BtnColorClass.PRIMARY
      break;

    case ButtonCategory.SECONDARY:
      buttonColor = BtnColorClass.SECONDARY
      break;

    case ButtonCategory.DANGER:
      buttonColor = BtnColorClass.DANGER
      break;

    case ButtonCategory.SUCCESS:
      buttonColor = BtnColorClass.SUCCESS
      break;

    case ButtonCategory.NORMAL:
      buttonColor = BtnColorClass.NORMAL
      break;

    default:
      break;
  }

  return (
    <div>
      {/* mr-2 
      m-2 */}
      <button onClick={onClick ?? emptyClick} type={(type ?? "button") as BtnType } className={`
      shadow-lg 
      text-white 
      focus:outline-none 
      font-medium 
      rounded 
      text-sm
      px-5
      py-2.5
      text-center 
      
      ${buttonColor} 
      ${className}
      grid content-center
      `}>
        
          <div className={`flex gap-2  ${height} grid content-center grid-flow-col auto-cols-max`}>
            <div className='flex justify-center w-full'> {children}</div>

            {isDropdown && <div className='grid content-center opacity-50 w-fit'>
              <ArrowDownIcon />
            </div>}

          </div>
       
      </button>
    </div>
  )
}

export default ABButton 