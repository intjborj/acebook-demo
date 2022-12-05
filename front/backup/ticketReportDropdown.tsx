import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Fragment } from 'react'

type Props = {
  children?: any
  hasPopover?: boolean;
  menu?: any
}

export default function TicketReportDropdown({ children, hasPopover = false, menu }: Props) {
  return (
    // <div className="fixed top-16 w-full max-w-sm px-4 z-50">
    <div className='relative  w-full h-full' >
      <Popover >
        {/* <Popover className="relative"> */}
        {({ open }) => (
          <>
            {/* <Popover.Button
              className={`
                ${open ? '' : 'text-opacity-90'}
                group inline-flex items-center rounded-md bg-orange-700 px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`
              }
            >  */}
            <Popover.Button
              className={`
              w-full h-full focus:outline-none
                ${open ? '' : 'text-opacity-90'}
                `
              }
            >
              {children}
              {/* <span>Solutions</span> */}
              {/* <ChevronDownIcon
                className={`${open ? '' : 'text-opacity-70'}
                  ml-2 h-5 w-5 text-orange-300 transition duration-150 ease-in-out group-hover:text-opacity-80`}
                aria-hidden="true"
              /> */}
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
                {/* <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl"> */}
                <Popover.Panel className="pt-1 absolute -left-[5.6rem] md:-left-[.5rem] z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 ">
                  <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="relative grid gap-3 bg-white p-7 grid-cols-1  ">
                      {/* <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-2"> */}
                      {menu.map((item:any) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                        >
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center text-white sm:h-10 sm:w-10">
                            <item.icon aria-hidden="true" />
                          </div>
                          <div className="ml-4">
                            <p className="text-xs md:text-sm font-medium text-gray-900">
                              {item.name}
                            </p>
                            {/* <p className="text-sm text-gray-500">
                            {item.description}
                          </p> */}
                          </div>
                        </a>
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

