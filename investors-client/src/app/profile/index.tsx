import Card from '@/components/common/card'
import Button from '@/components/ui/button'
import Link from '@/components/ui/link'
import React from 'react'
import { getAuthCredentials } from "@utils/auth-utils";
type Props = {}

const ProfileApp = (props: Props) => {

    const {  user } = getAuthCredentials();

    return (
        <div>
            <Card>
                <Link href={`/profile/update/${user?._id}`}><>  <Button>UPDATE</Button></></Link>
            </Card>
        </div>
    )
}

export default ProfileApp