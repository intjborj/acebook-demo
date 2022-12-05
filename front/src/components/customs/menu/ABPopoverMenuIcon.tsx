import FucntionRestriction from '@/app/restrictions/system/function'
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
    children?: any
    hasPopover?: boolean;
    menu?: MenuGrpAttType[],
    action?: any;
    counter?: EntCounterType | null
}

export default function ABPopoverMenuIcon({ children, hasPopover = false, menu, action, counter }: Props) {

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
                            {children}
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
                                    className="pt-1 absolute -left-[5.6rem] md:-left-[.5rem] z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 ">
                                    <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                        <div className="relative grid gap-3 bg-white p-7 grid-cols-1  ">
                                            {/* <div className="relative grid gap-3 bg-white p-7 grid-cols-1  "> */}
                                            {menu && menu.map((item: MenuGrpAttType, index: number) => (
                                                <FucntionRestriction code={item.restriction} isPublic={item.isPublic}>
                                                    <a
                                                        onClickCapture={() => {
                                                            action ? action(item.fetchCode) : {}
                                                            buttonRef.current?.click()
                                                        }}
                                                        key={index}
                                                        href={item.route}
                                                        className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                                    >
                                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center text-white sm:h-10 sm:w-10">
                                                            <item.icon aria-hidden="true" />
                                                        </div>
                                                        <div className="ml-4 flex grid grid-flow-col auto-cols-max">
                                                            {/* <div className="ml-4 flex grid grid-flow-col auto-cols-max"> */}
                                                            <p className="text-xs md:text-sm font-medium text-gray-900">
                                                                {item.name}
                                                            </p>
                                                            {item.countObj &&
                                                                <div className='grid z-40 content-center pl-1 grid-cols-2 gap-1 scale-75 font-semibold'>
                                                                {/* <div className='grid z-40 content-center pl-2 grid-cols-2 gap-1 scale-75 font-semibold'> */}
                                                                    {(item.countObj.new || (item.countObj.new && item.countObj.new > 0)) ?
                                                                        <div
                                                                            onClick={() => { counterClick(item.countObj?.newRoute) }}
                                                                            className='px-2  rounded-full w-fit text-white text-sm bg-gradient-to-r from-cyan-500 to-blue-500'>
                                                                            <span>New</span>   <span >{item.countObj.new}</span>
                                                                        </div> : <></>}

                                                                    {(item.countObj.all || (item.countObj.all && item.countObj.all > 0)) ?
                                                                        <div
                                                                            onClick={() => { counterClick(item.countObj?.allRoute) }}
                                                                            className={`px-2  rounded-full w-fit text-white text-sm ${BtnColorClass.INDIGO}`}>
                                                                            <span>All</span>   <span  > {item.countObj.all}</span>
                                                                        </div> : <></>}

                                                                </div>
                                                            }
                                                        </div>
                                                    </a>
                                                </FucntionRestriction>
                                            ))}
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
