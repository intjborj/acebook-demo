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

type Props = { data: TicketFormValues }

const TicketDataCard = ({ data }: Props) => {
    const { user } = getAuthCredentials();
    

    const createdDate: Date = data.created_at as Date




    return (
        <div>
            <Card className='p-3 md:p-4 grid content-center'>
                <div className='grid grid-cols-2'>


                    <div className='grid grid-cols-1 h-fit'>
                        <div className='flex '>
                            <CodeLabel code={data.code} />
                            <div className='opacity-80 scale-75'>
                                <PostTagIcon
                                    name={(data?.status ? ticketStatusIdentifier(data?.status, 'name') : '') as string}
                                    bgClass={(data?.status ? ticketStatusIdentifier(data?.status, 'class') : '') as string} />
                            </div>
                        </div>
                        <div>
                            <div className='capitalize font-bold text-slate-800'>
                                {_.get(data, "requestedBy.firstName")}, {_.get(data, "requestedBy.lastName")} <span className='font-bold text-xs '>[{_.get(data, "serviceDepartment.name")}]</span>
                            </div>
                            <div className='text-xs font-semibold text-slate-500'>
                                {data.dateRequested && <>  Requested on {moment(data.dateRequested).format("ll")}</>}
                            </div>

                        </div>

                    </div>



                    <div className='flex-wrap flex  justify-end gap-1'>
                        <div className=''>
                            <TypeLabel width='w-fit' label={(data?.type ? ticketTypeIdentifier(data?.type, 'name') : '') as string} variation="small" />
                        </div>
                        <div>
                            <div className='flex gap-1'>
                                {[_.get(data, "serviceDepartment._id")].includes(_.get(user, "departmentOnDuty._id")) ? <Link href={`${FrontPath.TICKET_UPDATE}/${data?._id}`}> <EditPackIcon /></Link> : ''}
                                <Link href={`${FrontPath.TICKET_VIEW}/${data?._id}`}><EyePackIcon /></Link>
                            </div>
                        </div>
                    </div>

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