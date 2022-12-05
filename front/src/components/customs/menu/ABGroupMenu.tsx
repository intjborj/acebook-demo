import { useState, useEffect } from 'react'
import { Tab } from '@headlessui/react'
import { AttributeInputType } from '__generated__/__types__';
import ABPopoverMenuIcon from './ABPopoverMenuIcon';
import { MenuGrpAttType } from '@/types/custom';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import FucntionRestriction from '@/app/restrictions/system/function';

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

type Props = {
    action?: any;
    menu?: MenuGrpAttType[],
    title: string
}

const ABGroupMenu = ({ menu, action, title }: Props) => {
    const [currentTab, setCurrentTab] = useState<any>(useLocalStorage({ type: 'get', variable: `${title}currentTab` }));

    useEffect(() => {
        if (currentTab == 0) {
            useLocalStorage({ type: 'set', variable: `${title}currentTab`, value: 0 })
        }

    }, []);



    return (
        <div className="w-full  px-2 py-2 sm:px-0">
            {/* <div className="w-full max-w-md px-2 py-2 sm:px-0"> */}
            <Tab.Group defaultIndex={currentTab} onChange={(tab) => useLocalStorage({ type: 'set', variable: `${title}currentTab`, value: tab })}>
                <Tab.List className="flex space-x-1 rounded-xl bg-teal-900/20 p-1 ">
                    {menu && menu.map((item: MenuGrpAttType, index: number) => (
                        <FucntionRestriction code={item.restriction} isPublic={item.isPublic}>
                            <ABPopoverMenuIcon hasPopover={item.isDropdown ? true : false} menu={item.submenu} action={action}>
                                <Tab
                                    key={index}
                                    className={({ selected }) =>
                                        classNames(
                                            'w-full relative  rounded-lg py-2.5 text-xs md:text-sm font-medium leading-5 text-teal-800 ',
                                            //   'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                            'focus:outline-none ',

                                            selected
                                                ? 'bg-white shadow'
                                                : 'text-teal-600  bg-white/[0.30] hover:bg-white/[0.40] hover:text-teal-700 '
                                        )
                                    }
                                    onClick={() => {
                                        item.isDropdown ? {} : (action ? action(item.fetchCode) : {})
                                    }}
                                >

                                    <span>
                                        {(item.count as any > 0) && <span className="right-[.2rem] top-[.2rem] absolute inline-flex justify-center items-center ml-2 w-4 h-4 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
                                            {item.count}
                                        </span>}
                                        {item.name}
                                    </span>


                                </Tab>
                            </ABPopoverMenuIcon>
                        </FucntionRestriction>
                    ))}

                </Tab.List>

            </Tab.Group>
        </div>
    )
}

export default ABGroupMenu