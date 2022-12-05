import EditPackIcon from '@/components/customs/iconPackage/editPack-icon'
import EyePackIcon from '@/components/customs/iconPackage/eyePack-icon'
import CodeLabel from '@/components/customs/labels/codeLabel'
import TypeLabel from '@/components/customs/labels/typeLabel'
import PostTagIcon from '@/components/tags/tagIcon'
import Card from '@/components/ui/cards/card'
import { ticketStatusIdentifier, ticketTypeIdentifier } from '@/constants/options'
import { TicketFormValues } from '@/types/tickets/ticketType'
import _ from 'lodash'
import React from 'react'
import { getAuthCredentials } from "@utils/auth-utils";
import Link from '@/components/ui/link'
import { FrontPath } from '@/constants/enums/paths'
import ReactTimeAgo from 'react-time-ago'
import moment from 'moment'
import { useRouter } from 'next/router';
import ABOverDueTag from '@/components/customs/labels/ABOverDueTag'

export type TicketCardDataType = {
    created_at: Date | string;
    code?: string;
    status?: string;
    firstName?: string;
    lastName?: string;
    serviceDepartment?: string;
    requestingDepartment?: string;
    type?: string;
    typeId?: string;
    _id?: string;
    subject?: string;
    dateRequested?: string;
    dateNeeded?: string;
}

type Props = {
    data: TicketCardDataType,
    viewPath?: string | null;
    updatePath?: string | null;
}

const TicketDataCard = ({ data, updatePath, viewPath }: Props) => {
    const { user } = getAuthCredentials();
    const router = useRouter();

    const createdDate: Date = data.created_at as Date

    const clickedLink = (event: any, route: string) => {
        event.stopPropagation();
        router.push(route)
    }


    return (
        <div className='hover:drop-shadow-lg  transition-shadow duration-700 transform'
            onClick={(event: any) => { viewPath ? clickedLink(event, viewPath) : {} }}
        >
            <Card className='p-3 md:p-4 grid content-center cursor-pointer'

            >
                <div className='grid grid-cols-2'  >


                    <div className='grid grid-cols-1 h-fit'>
                        {/* <div className='flex '> */}
                        <div className='flex-wrap flex'>
                            <CodeLabel code={data.code} />
                            <div className='opacity-80 scale-75 '>
                                <PostTagIcon
                                    name={(data?.status ? ticketStatusIdentifier(data?.status, 'name') : '') as string}
                                    bgClass={(data?.status ? ticketStatusIdentifier(data?.status, 'class') : '') as string} />
                            </div>
                        </div>
                        <div>
                            <div className='capitalize font-bold text-slate-800'>
                                {data?.firstName}, {data?.lastName} <span className='font-bold text-xs '>[{data?.requestingDepartment}]</span>
                            </div>
                            {/* <div className='text-xs font-semibold text-slate-500'>
                                {data.dateRequested && <>  Requested  <span className='font-bold'>{moment(data.dateRequested).format("ll")}</span></>}
                                {data.dateNeeded && <div className='flex'>
                                    <div>   / Needed <span className='font-bold'>{moment(data.dateNeeded).format("ll")}</span>
                                    </div>
                                    <ABOverDueTag dateNeeded={data.dateNeeded} status={data?.status} />
                                </div>}
                            </div> */}

                        </div>

                    </div>



                    <div className='flex-wrap flex  justify-end gap-1 h-fit'>
                        <div className=''>
                            <TypeLabel width='w-fit' label={(data?.typeId ? _.get(data, "typeId.name") : '') as string} variation="small" />
                            {/* <TypeLabel width='w-fit' label={(data?.type ? ticketTypeIdentifier(data?.type, 'name') : '') as string} variation="small" /> */}
                        </div>
                        <div className='grid content-center'>
                            <div className='flex gap-1  justify-end'>
                                {updatePath && <div onClick={(event: any) => { updatePath ? clickedLink(event, updatePath) : {} }}> <EditPackIcon /></div>}
                                {/* {viewPath && <div onClick={(event: any) => { viewPath ? clickedLink(event, viewPath) : {} }} ><EyePackIcon /></div>} */}
                               
                               
                               
                                {/* {updatePath && <Link href={`${updatePath}`}> <EditPackIcon /></Link>}
                                {viewPath && <Link href={`${viewPath}`}><EyePackIcon /></Link>}
                                 */}
                                {/* {[_.get(data, "serviceDepartment._id")].includes(_.get(user, "departmentOnDuty._id")) ? <Link href={`${FrontPath.TICKET_UPDATE}/${data?._id}`}> <EditPackIcon /></Link> : ''}
                                <Link href={`${FrontPath.TICKET_VIEW}/${data?._id}`}><EyePackIcon /></Link> */}
                            </div>
                        </div>
                    </div>

                </div>
                <div className='text-xs font-semibold text-slate-500  grid grid-flow-col auto-cols-max '>
                    <div className='grid content-center'>
                        <div className='grid grid-flow-col auto-cols-max '>
                            {data.dateRequested && <>  Requested {moment(data.dateRequested).format("ll")}</>}
                            {data.dateNeeded &&
                                <div className='flex'>
                                    <div className='pl-1'> / Needed {moment(data.dateNeeded).format("ll")}
                                    </div>
                                </div>}
                        </div>
                    </div>
                    <div className='grid place-content-start scale-[.8] '>   <ABOverDueTag dateNeeded={data.dateNeeded} status={data?.status} /> </div>
                </div>
                <div className='text-sm font-semibold text-slate-700 pt-1'>
                    {data.subject && <>{data?.subject}</>}
                </div>

                <div>
                    <div className=' flex justify-end'>
                        <div className='text-xs font-bold text-zinc-400 scale-75'>
                            {data?.created_at && <ReactTimeAgo date={createdDate} />}
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default TicketDataCard