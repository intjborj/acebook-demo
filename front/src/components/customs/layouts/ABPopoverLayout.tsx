import { BtnColorClass } from '@/components/ui/buttons/ABbutton'
import { EntCounterType, MenuGrpAttType } from '@/types/custom'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Fragment, useRef } from 'react'

type CounterType = {
    new?: number;
    all?: number;
}
type Props = {
    button?: any
    children?: JSX.Element
    hasPopover?: boolean;
    menu?: MenuGrpAttType[],
    action?: any;
    counter?: EntCounterType | null
    popoverPosition?: string | null;
}

export default function ABPopoverLayout({ button, children, hasPopover = false, menu, action, counter, popoverPosition }: Props) {

    const counterClick = (code: any) => {
        if (action && code) {
            action(code)
        }
    }

    const buttonRef = useRef<any>();
    return (
        <div className='relative  w-full h-full' >
            <Popover >
                {({ open }) => (
                    <>
                        <Popover.Button
                            ref={buttonRef}
                            className={`
              w-full h-full focus:outline-none
                ${open ? '' : 'text-opacity-90'}
                `
                            }
                        >
                            {button}
                            {/* {children} */}
                        </Popover.Button>
                        {hasPopover ?
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                            >
                                <Popover.Panel
                                    className={`pt-1 absolute ${popoverPosition ?? ' -left-[5.6rem] md:-left-[.5rem] '} z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 `}>
                                    {/* className="pt-1 absolute -left-[5.6rem] md:-left-[.5rem] z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 "> */}
                                    <div className=" rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                    {/* <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"> */}
                                        <div className="relative grid gap-3 bg-white p-7 grid-cols-1  ">
                                            {children}
                                        </div>
                                    </div>
                                </Popover.Panel>
                            </Transition> : <></>
                        }
                    </>
                )}
            </Popover>
        </div>
    )
}
