import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { getAuthCredentials } from "@utils/auth-utils";
import { ALL_RESTRICTIONS } from '../allRestrictions';



type Props = {
    children?: JSX.Element
}

const PageRestriction = ({ children }: Props) => {
    const { asPath, push } = useRouter();
    const [permitted, setPermitted] = useState(true)
    const { token: cookieToken, permissions: cookiePermissions, id: cookieUserId, user: cookieUser } = getAuthCredentials();
  

    useEffect(() => {

        let result = ALL_RESTRICTIONS.filter((item:any)=>{
            return item.path === asPath
        })

      

        if(result.length > 0){
            if(cookieUser.restrictionCode?.includes(result[0].code) == false){
                push('404')
            }
        }

       
    }, [asPath])





    return (
        <div>{children}</div>
    )
}

export default PageRestriction