import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { getAuthCredentials } from "@utils/auth-utils";
import { ALL_RESTRICTIONS } from '../allRestrictions';



type Props = {
    children?: JSX.Element;
    code?: string;
}

const FunctionRestriction = ({ children, code }: Props) => {
    const { asPath, push } = useRouter();
    const [permitted, setPermitted] = useState(true)
    const { token: cookieToken, permissions: cookiePermissions, id: cookieUserId, user: cookieUser } = getAuthCredentials();
  
    useEffect(() => {
            if (code && !cookieUser?.restrictionCode?.includes(code) && !cookieUser?.restrictionCode?.includes("ALL_RESTRICTIONS")) {
                setPermitted(false)
            }
    }, [])

    return (
        <>
            {
                permitted ?
                    <>
                        {children}
                    </>
                    : <></>
            }
        </>
    )
}

export default FunctionRestriction