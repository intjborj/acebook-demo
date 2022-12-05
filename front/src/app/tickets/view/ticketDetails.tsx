// Dependencies
import React from 'react'
import _, { isEmpty } from 'lodash';
import ReactTimeAgo from 'react-time-ago';
// Constants
import { LabelColor } from '@/constants/enums/themes';
import { TicketDataType } from '@/types/tickets/ticketType';
// Custom Components
import Card from '@/components/common/card';
import PostedByDetails from '@/app/posts/components/postedByDetails';
import { usePassedDateCheck } from '@/hooks/usePassedDateCheck';
import PostTagIcon from '@/components/tags/tagIcon';
import { TicketStatus } from '@/constants/enums/paths';
import ABOverDueTag from '@/components/customs/labels/ABOverDueTag';
import moment from 'moment';

type Props = {
    ticketData?: TicketDataType;
    isApprover?: boolean;
    pending?: boolean;
    approvingAction?: any;
}

const TicketDetails = ({ ticketData: data }: Props) => {

    const OtherDetailsCont = ({ label, value }: { label: string, value?: string }) => {
        return (
            <div>
                {value && <div className='text-xs md:text-sm '>
                    <span className={`font-bold  ${LabelColor.PRIMARY}`}>   {label}: </span>
                    <span className={`font-semibold ${LabelColor.SECONDARY}`}>{value}</span>
                </div>}
            </div>
        )
    }
    return (
        <div>
            <Card>
                <div className='flex flex-wrap relative '>
                    <div className='md:pt-1 md:pt-0 w-full'>
                        <div className='relative'>
                            <div className='flex'>

                                <PostedByDetails
                                    firstName={data?.requestedBy?.firstName}
                                    lastName={data?.requestedBy?.lastName}
                                    department={data?.requestingDepartment?.name}
                                    profilePicture={data?.requestedBy?.profilePicture}
                                    id={data?.requestedBy?._id}
                                />

                                <div className="grid content-center absolute right-0">
                                    <ABOverDueTag dateNeeded={data?.dateNeeded} status={_.get(data, "status")} />
                                </div>
                            </div>

                            <div className='absolute   top-[2.3rem] left-[3rem]'>
                                {/* <div className='absolute   top-[2.3rem] left-[3rem]'> */}
                                <div className='relative flex'>
                                    <div className="text-[12px] text-body flex  grid grid-flow-col auto-cols-max ">
                                        {data?.dateRequested && <ReactTimeAgo date={new Date(data.dateRequested)} locale="en-US" />}
                                        {data?.dateNeeded && <>  <b>  &nbsp; / needed &nbsp;<ReactTimeAgo date={new Date(data.dateNeeded)} locale="en-US" /></b></>}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='pt-3'>
                    <h5 className="text-2xl font-normal leading-normal mt-0  text-stone-800">  {data?.subject} </h5>
                </div>
                <div className='pt-1 pb-3' >
                    <p className="text-base font-light leading-relaxed mt-0 mb-0 text-zinc-800">
                        {data?.description}
                    </p>
                </div>
                <div className='pt-10 relative '>
                    <OtherDetailsCont label={'Affected Asset'} value={data?.asset?.name} />
                    <OtherDetailsCont label={'Service Department'} value={data?.serviceDepartment?.name} />
                    <OtherDetailsCont label={'Service Location'} value={data?.location} />
                   {!isEmpty(data?.dateNeeded) && <OtherDetailsCont label={'Date Needed'} value={moment(data?.dateNeeded).format('MMMM DD, YYYY, h:mm a')} />}
                </div>
            </Card>
        </div>
    )
}

export default TicketDetails