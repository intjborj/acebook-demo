import React from 'react'
import { getAuthCredentials, hasAccess } from "@utils/auth-utils";
import _ from 'lodash';
import { getFirstLetters } from '@/services/getFirstLetters';
type Props = {
    isDesktop?: boolean;
}

const ABUserLoggedIn = ({isDesktop}: Props) => {
    const { user } = getAuthCredentials();
    return (
        <div>
            {user && <div className=' text-right pr-1'>
                { isDesktop ? `${_.get(user, "firstName")}` : `${getFirstLetters(_.get(user, "firstName"))}.`}  {_.get(user, "lastName")} | <b> {_.get(user, "departmentOnDuty.name")}</b>
            </div>}
        </div>
    )
}

export default ABUserLoggedIn