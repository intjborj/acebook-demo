import React, { useState, useEffect, useMemo } from 'react'
import { Transition } from '@headlessui/react'
import { Fragment, useRef } from 'react'

type Props = {
    children?: any
    order?: number;
}

const ABTransition = ({ children, order }: Props) => {
    const [isShowing, setIsShowing] = useState(false)
    const timeConvert = (order: number) => {
        return order ? order * 200 : 100
    }

    useEffect(() => {
        if (isShowing == false) {
            setTimeout(() => {
                setIsShowing(true)
            }, timeConvert(order as number));
        }
        return () => {
            setIsShowing(false)
        }
    }, [])

    return (
        <div className='w-full'>
            {/* <Transition
                show={isShowing}
                enter="transition-opacity duration-[400ms]"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            > */}
            <Transition
                show={isShowing}
                // as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
            >
                {children}
            </Transition>
        </div>

    )
}

export default ABTransition