import PostTagIcon from '@/components/tags/tagIcon'
import { ticketStatusIdentifier } from '@/constants/options';
import React from 'react'

type Props = {
    ticket: any;
}

const PostTicket = ({ticket}: Props) => {

  return (
    <div className=' scale-75 md:scale-100 absolute right-2 md:right-5 '>
        <PostTagIcon name={ticketStatusIdentifier(ticket?.status, "name") as string} bgColor={`#cc0000`} textColor={'#bcbcbc'} bgClass={ticketStatusIdentifier(ticket?.status, "class") as string} />
        {/* <PostTagIcon name={ticketStatusIdentifier(ticket?.status, "name")} bgColor={ticketStatusIdentifier(ticket?.status, "color")} textColor={ticketStatusIdentifier(ticket?.status, "textColor")} /> */}
    </div>
  )
}

export default PostTicket