import React from 'react'
import { adminOnly } from '@/utils/auth-utils';

type Props = {
    children :JSX.Element[]
}

const GeneralRestriction = ({children}:Props) => {
    return (
        <>
            {children}
        </>
    )
}
// GeneralRestriction.authenticate = {
//     permissions: adminOnly,
// };
export default GeneralRestriction