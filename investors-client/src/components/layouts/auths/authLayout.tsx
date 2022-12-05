import React, { Children } from 'react'
import Logo from '@/components/ui/logo';
import moment from 'moment';

type Props = {
    children?: JSX.Element | JSX.Element[]
}

const AuthLayout = ({ children }: Props) => {
    return (
        <div>
            <div className="flex h-full min-h-screen w-screen flex-col justify-center bg-light py-6 px-5 sm:p-8 md:h-auto md:min-h-0 md:max-w-[480px] md:rounded-xl">
                <div className="flex justify-center mb-10">
                    {/* <Logo /> */}
                    <h1 className=" grid grid-cols-1 justify-center  content-center mb-2   text-gray-900  ">
                        <span className=" font-black text-transparent text-4xl md:text-5xl bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">ACEMC-BOHOL</span>
                        <span className='font-bold flex justify-center text-3xl md:text-4xl'>ASM {moment().format('YYYY')}</span>
                    </h1>
                    {/* <h1 className="grid content-center mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">ACEMCB</span>ASM</h1> */}
                </div>
                {children}
            </div>
        </div>
    )
}

export default AuthLayout