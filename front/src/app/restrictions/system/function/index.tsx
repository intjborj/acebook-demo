import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { getAuthCredentials } from "@utils/auth-utils";
import { ALL_RESTRICTIONS } from '../allRestrictions';



type Props = {
    children?: JSX.Element;
    code?: string;
    disableCode?: string;
    isPublic?: boolean;
}

const FucntionRestriction = ({ children, code, isPublic, disableCode }: Props) => {
    const { asPath, push } = useRouter();
    const [permitted, setPermitted] = useState(true)
    const { token: cookieToken, permissions: cookiePermissions, id: cookieUserId, user: cookieUser } = getAuthCredentials();

    useEffect(() => {

        if (code) {
            if (cookieUser && !cookieUser.restrictionCode?.includes(code)) {
                setPermitted(false)
            }
        } else {
            setPermitted(false)
        }

        if (cookieUser && cookieUser.restrictionCode?.includes("ALL_RESTRICTIONS")) {
            setPermitted(true)
        }

        if (disableCode) {
            if (cookieUser && cookieUser.restrictionCode?.includes(disableCode)) {
                setPermitted(false)
            } else {
                setPermitted(true)
            }
        }



    }, [])

    return (
        <>
            {
                (permitted || isPublic) ?
                    <>
                        {children}
                    </>
                    : <></>
            }
        </>
    )
}

export default FucntionRestriction