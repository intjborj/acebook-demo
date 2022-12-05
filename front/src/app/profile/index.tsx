import Card from '@/components/common/card'
import Button from '@/components/ui/button'
import Link from '@/components/ui/link'
import React from 'react'
import { getAuthCredentials } from "@utils/auth-utils";
import ABButton from '@/components/ui/buttons/ABbutton';
type Props = {}

const ProfileApp = (props: Props) => {

    const {  user } = getAuthCredentials();

    return (
        <div>
            <Card>
                <Link href={`/profile/update/${user?._id}`}><>  <ABButton>UPDATE</ABButton></></Link>
            </Card>
        </div>
    )
}

export default ProfileApp