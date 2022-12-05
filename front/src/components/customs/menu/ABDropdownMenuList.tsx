import React from 'react'
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import cn from 'classnames';
import ABButton from '@/components/ui/buttons/ABbutton';
import { isEmpty } from 'lodash';


export type ABDropMenuType = {
    display?: boolean;
    name?: string;
    fetchCode?: string;
    label?: string;
    action?: any
}

type Props = {
    minimal?: boolean;
    menu?: ABDropMenuType[];
    buttonName?: string;
    button?: any;
    action?: any;
}

const ABDropdownMenuList = ({ minimal = true, menu, buttonName, button, action }: Props) => {

    return (
        <div>
            <Menu
                as="div"
                className="relative inline-block ltr:text-left rtl:text-right "

            >
                <div className='flex gap-2'>
                    <Menu.Button className="flex items-center focus:outline-none">

                        {
                            buttonName ?
                                <ABButton isDropdown={true}  >
                                    {buttonName}
                                </ABButton> : button
                        }
                    </Menu.Button>
                </div>
                <div className=' flex justify-center'>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items
                            as="ul"
                            className={cn(
                                ' divide-y z-10 absolute right-0  scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-slate-100 overflow-y-scroll min-h-fit   min-w-12 max-w-52 w-32  rounded bg-white  shadow-700 focus:outline-none ltr:right-0',
                                // ' divide-y z-10 absolute right-0  scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-slate-100 overflow-y-scroll min-h-fit   min-w-12 w-52  rounded bg-white  shadow-700 focus:outline-none ltr:right-0',
                                // 'absolute  scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-slate-100 overflow-y-scroll min-h-fit h-96 mt-1 w-96 rounded bg-white pb-4 shadow-700 focus:outline-none ltr:right-0 ltr:origin-top-right rtl:left-0 rtl:origin-top-left',
                                {
                                    '!mt-2': minimal,
                                }
                            )}
                        >
                            {menu && menu.map((item: ABDropMenuType, index:number) => (
                                <div key={index}>
                                    {(item.display) ?
                                        <Menu.Item key={index} >
                                            <li key={index} className='pl-3 py-1 cursor-pointer border-solid text-sm text-zinc-500' onClick={() => { item.action ? item.action() : {} }}>
                                                {item.label}
                                            </li>
                                        </Menu.Item> : <></>}
                                </div>
                            ))}
                        </Menu.Items>
                    </Transition>
                </div>
            </Menu>
        </div>

    )
}

export default ABDropdownMenuList