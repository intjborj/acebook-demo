import React from 'react'
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import cn from 'classnames';
import ABButton from '../../buttons/ABbutton';


type MenuType = {
    name?: string;
    fetchCode?: string;
    label?: string;
}

type Props = {
    minimal?: boolean;
    menu?: MenuType[];
    buttonName?: string;
    button?: any;
    action?: any;
}

const DropdownTrans = ({ minimal = true, menu, buttonName, button, action }: Props) => {

    return (
        <div>
            <Menu
                as="div"
                className="relative inline-block ltr:text-left rtl:text-right"

            >
                <div className='flex gap-2'>
                    <Menu.Button className="flex items-center focus:outline-none">
                        {/* <div className='w-8 cursor-pointer text-neutral-500 pt-1' >
                            BUtton
                        </div> */}

                       {buttonName ? <ABButton isDropdown={true}  >
                            {buttonName}
                        </ABButton> : button}
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
                                'divide-y z-10 absolute  scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-slate-100 overflow-y-scroll min-h-fit   min-w-12 w-52  rounded bg-white  shadow-700 focus:outline-none ltr:left-0',
                                // 'absolute  scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-slate-100 overflow-y-scroll min-h-fit h-96 mt-1 w-96 rounded bg-white pb-4 shadow-700 focus:outline-none ltr:right-0 ltr:origin-top-right rtl:left-0 rtl:origin-top-left',
                                {
                                    '!mt-2': minimal,
                                }
                            )}
                        >
                            {menu && menu.map((item: MenuType) => (
                                <Menu.Item >
                                    <li className='pl-3 py-1 cursor-pointer border-solid text-sm text-zinc-500' onClick={() => { action && action(item) }}>
                                        {item.label}
                                    </li>
                                </Menu.Item>
                            ))}
                        </Menu.Items>
                    </Transition>
                </div>
            </Menu>
        </div>

    )
}

export default DropdownTrans