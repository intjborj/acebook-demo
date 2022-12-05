import Button from '@/components/admin/components/ui/button'
import { TabMenuType } from '@/types/custom';
import React, { useState } from 'react'

type Props = {
    btnName?: string;
    action?: any;
    menu?: any;
}

const Dropdown = ({ btnName, action, menu }: Props) => {
    const [open, setOpen] = useState(false)
    return (
        <div>
            <div className='w-fit pb-2' onClick={e => setOpen(!open)}>
                <Button size='small'>
                    {btnName ?? 'More Option'}
                    <svg className="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </Button>
                {/* <button id="dropdownDefault" data-dropdown-toggle="dropdown" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                    Dropdown button <svg className="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button> */}
            </div>

            {open ?
                <>
                    <div id="dropdown" className=" drop-shadow-lg origin-top-left mt-2 absolute z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
                        <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
                            {
                                menu &&
                                <>
                                    {
                                        menu.map((item: TabMenuType) => (
                                            <li onClick={()=>{
                                                action ?action(item) : {}
                                                
                                            }}>
                                                <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{item.label}</a>
                                            </li>
                                        ))
                                    }
                                </>
                            }



                        </ul>
                    </div>
                </>
                : <></>
            }

        </div>
    )
}

export default Dropdown