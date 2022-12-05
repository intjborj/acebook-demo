import { useState } from 'react'
import { Switch } from '@headlessui/react'

type props ={
    onChange?: (data:any)=>void;
    value?: boolean;
}


export function ABSwitch({onChange, value}: props) {
  const [enabled, setEnabled] = useState(value ?? false)

  const handleChange = (data: any)=>{
    setEnabled(data)
    if(onChange){
        onChange(data)
    }
  }

  return (
    <Switch
      checked={enabled}
      onChange={(data: any)=>handleChange(data)}
      className={`${
        enabled ?  "shadow-teal-500/50 bg-gradient-to-r from-teal-500 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:shadow-teal-700/70 focus:ring-teal-300  dark:focus:ring-teal-800 " : 'bg-gray-200'
      } relative inline-flex h-6 w-11 items-center rounded-full`}
    >
      <span className="sr-only">Enable notifications</span>
      <span
        className={`${
          enabled ? 'translate-x-6' : 'translate-x-1'
        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
      />
    </Switch>
  )
}