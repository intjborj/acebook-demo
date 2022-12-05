import PostTagIcon from '@/components/tags/tagIcon'
import { ticketStatusIdentifier } from '@/constants/options';
import React from 'react'

type Props = {
    ticket: any;
}

const PostTicket = ({ticket}: Props) => {

  return (
    <div>
        <PostTagIcon name={ticketStatusIdentifier(ticket?.status, "name")} bgColor={`#cc0000`} textColor={'#bcbcbc'} bgClass={ticketStatusIdentifier(ticket?.status, "class")} />
        {/* <PostTagIcon name={ticketStatusIdentifier(ticket?.status, "name")} bgColor={ticketStatusIdentifier(ticket?.status, "color")} textColor={ticketStatusIdentifier(ticket?.status, "textColor")} /> */}
    </div>
  )
}

export default PostTicket