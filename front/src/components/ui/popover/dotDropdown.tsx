import { VerticalDotsIcon } from '@/components/icons/vertical-dots'
import React, { useState } from 'react'
import { getAuthCredentials } from '@/utils/auth-utils';
import _ from 'lodash';
import ABTransition from '@/components/customs/transitions/ABTransition';
type Props = {
    children: JSX.Element
}

const DotDropdown = ({ children }: Props) => {


    const [open, setOpen] = useState(false)
    return (
        <div>
            <div className='cursor-pointer  text-slate-400'> <div onClick={e => setOpen(!open)}><VerticalDotsIcon /></div></div>
            {open ?
                <>
                    <ABTransition>
                        <div onMouseLeave={e => setOpen(!open)} className="origin-top-right absolute right-0 mt-2 w-56 rounded-md z-50 shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
                        {/* <div onMouseLeave={e => setOpen(!open)} className="origin-top-right absolute right-0 mt-2 w-56 rounded-md z-50 shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button"> */}

                            <div className="py-1  " role="none">
                                {children}
                            </div>
                        </div>
                    </ABTransition>
                </>
                : <></>
            }
        </div>
    )
}

export default DotDropdown