import { VerticalDotsIcon } from '@/components/icons/vertical-dots'
import React, { useState } from 'react'
import { getAuthCredentials } from '@/utils/auth-utils';
import _ from 'lodash';
import DotDropdown from '@/components/ui/popover/dotDropdown';
import Link from '@/components/ui/link';
type Props = {
    clicked?: any;
    index?: number;
    postUserId?: string;
    postId?: string;
    ticketId?: string;
}

const PostOptions = ({ clicked, index, postUserId, postId, ticketId }: Props) => {
    const { user } = getAuthCredentials();

    return (
        <div>
            <DotDropdown>
                <>
                    {_.get(user, '_id') === postUserId ? <span onClick={e => clicked("edit")} className="text-gray-700 block px-4 py-1 text-sm w-full cursor-pointer" role="menuitem">Edit</span> : <></>}
                    {(postId && ticketId == null)  && <Link href={`/tickets/form/post/${postId}`}> <span className="text-gray-700 block px-4 py-1 text-sm w-full cursor-pointer" role="menuitem" >Create Ticket</span></Link>}
                    {ticketId && <Link href={`/tickets/form/update/${ticketId}`}> <span className="text-gray-700 block px-4 py-1 text-sm w-full cursor-pointer" role="menuitem" >Update Ticket</span></Link>}
                    {ticketId && <Link href={`/tickets/view/${ticketId}`}> <span className="text-gray-700 block px-4 py-1 text-sm w-full cursor-pointer" role="menuitem" >View Ticket</span></Link>}
                    {/* <Link> <span onClick={e => clicked("ticket")} className="text-gray-700 block px-4 py-1 text-sm w-full cursor-pointer" role="menuitem" >Create Ticket</span></Link> */}
                </>
            </DotDropdown>

        </div>
    )
}

export default PostOptions