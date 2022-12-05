import PostTagIcon from '@/components/tags/tagIcon';
import { TicketStatus } from '@/constants/enums/paths'
import { usePassedDateCheck } from '@/hooks/usePassedDateCheck'
import React from 'react'

type Props = {
    dateNeeded?: string;
    status?: string;
}

const ABOverDueTag = ({dateNeeded, status}: Props) => {
    return (
        <div>
            {dateNeeded &&
                <div className='scale-[.6] md:scale-[.8]  w-fit'>

                    {(usePassedDateCheck(new Date(dateNeeded)) && ![TicketStatus.SUCCESS, TicketStatus.CLOSED, TicketStatus.FAILED].includes(status as TicketStatus))
                        &&
                        <div className=' flex justify-start'>
                            <PostTagIcon name='Overdue' bgClass='bg-yellow-300 text-yellow-800' />
                        </div>}
                </div>
            }
        </div>
    )
}

export default ABOverDueTag