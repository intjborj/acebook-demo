import Card from '@/components/common/card';
import { ticketStatusIdentifier, ticketTypeIdentifier, TICKET_TYPE } from '@/constants/options';
import PostedByDetails from '@/app/posts/components/postedByDetails';
import _ from 'lodash';
import PostTagIcon from '@/components/tags/tagIcon';
import ReactTimeAgo from 'react-time-ago';
import InputLabelCont from '@/components/ui/labels/InputLabel';
import React from 'react'
import CodeLabel from '@/components/customs/labels/codeLabel';
import { TicketDataType, TicketFormValues } from '@/types/tickets/ticketType';
import EditPackIcon from '@/components/customs/iconPackage/editPack-icon';
import Link from '@/components/ui/link';
import { FrontPath } from '@/constants/enums/paths';
import { getAuthCredentials } from "@utils/auth-utils";

type Props = {
    ticketData?: TicketDataType;
    isApprover?: boolean;
    pending?: boolean;
    approvingAction?: any;
}

const TicketDetails = ({ ticketData: data, isApprover, pending, approvingAction }: Props) => {
    const { user } = getAuthCredentials();
    return (
        <div>
            <Card>
                <div className='flex flex-wrap relative '>
                    <div className='absolute right-0 flex justify-end z-10'>
                        {/* <div className='relative md:absolute right-0 flex justify-end'> */}
                        <div className='relative '>
                            <div className='flex gap-2'>
                                <CodeLabel code={data?.code} className={'flex justify-center text-xl  md:text-xl'} />
                                {
                                    [_.get(data, "serviceDepartment._id")].includes(_.get(user, "departmentOnDuty._id")) &&

                                    <Link href={`${FrontPath.TICKET_UPDATE}/${data?._id}`}><EditPackIcon /></Link>
                                }
                            </div>
                            <div className=' flex justify-end'>
                                <div className='border-solid text-xs border-2 w-max p-1 md:p-2 rounded-lg'>
                                    {/* <div className='border-solid border-2 w-max p-2 rounded-lg flex justify-center'> */}
                                    {(data?.type ? ticketTypeIdentifier(data?.type, 'name') : '') as string}
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='pt-8 md:pt-1 md:pt-0 w-full'>

                        <div className='relative'>
                            <PostedByDetails
                                firstName={data?.requestedBy?.firstName}
                                lastName={data?.requestedBy?.lastName}
                                department={data?.requestingDepartment?.name}
                                profilePicture={data?.requestedBy?.profilePicture} />
                            <div className='absolute   top-[2.3rem] left-[3rem]'>
                                <div className='relative flex'>
                                    <div className="text-[12px] text-body">

                                        {data?.dateRequested && <ReactTimeAgo date={data?.dateRequested} locale="en-US" />}

                                        {data?.dateNeeded && <>  <b>  &nbsp; / needed &nbsp;<ReactTimeAgo date={data.dateNeeded} locale="en-US" /></b></>}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='pt-4'>
                    <PostTagIcon
                        name={(data?.status ? ticketStatusIdentifier(data?.status, 'name') : '') as string}
                        bgClass={(data?.status ? ticketStatusIdentifier(data?.status, 'class') : '') as string} />
                </div>
                <div className='pt-3'>
                    <h5 className="text-2xl font-normal leading-normal mt-0  text-stone-800">  {data?.subject} </h5>
                </div>
                <div className='pt-1 pb-3' >
                    <p className="text-base font-light leading-relaxed mt-0 mb-0 text-zinc-800">
                        {data?.description}
                    </p>
                </div>

                <div className='pt-10 relative'>
                    <InputLabelCont label='Service Department' value={data?.serviceDepartment?.name} />
                   {data?.location && <InputLabelCont label='Service Location' value={data?.location} />}
                </div>


            </Card>
        </div>
    )
}

export default TicketDetails