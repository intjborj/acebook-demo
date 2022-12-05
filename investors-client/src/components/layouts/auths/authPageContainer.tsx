import React, { Children } from 'react'
import Logo from '@/components/ui/logo';

type Props = {
    children?: JSX.Element | JSX.Element[]
}

const AuthPageContainer = ({ children }: Props) => {
    return (
        <>
            <div className="  flex items-center justify-center bg-light sm:bg-gray-100">
                <div className=" m-6 flex items-center justify-center bg-light sm:bg-gray-100">
                    {children}
                </div>
            </div>
        </>
    )
}

export default AuthPageContainer