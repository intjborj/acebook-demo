import CodeLabel from '@/components/customs/labels/codeLabel'
import Card from '@/components/ui/cards/card'
import { TicketFormValues } from '@/types/tickets/ticketType'
import _ from 'lodash'
import React from 'react'
import { getAuthCredentials } from "@utils/auth-utils";
import Link from '@/components/ui/link'
import { FrontPath } from '@/constants/enums/paths'
import EditPackIcon from '@/components/customs/iconPackage/editPack-icon'
import { ticketStatusIdentifier, ticketTypeIdentifier } from '@/constants/options'
import PostTagIcon from '@/components/tags/tagIcon'
import TypeLabel from '@/components/customs/labels/typeLabel'

type Props = {
    ticketData?: any
}

const TicketHead = ({ ticketData }: Props) => {
    const { user } = getAuthCredentials();
    return (
        <div>
            <Card className='p-3 md:p-4 grid content-center'>
                <div className='grid grid-cols-2'>
                    <div className='flex justify-start'>
                        <div className='grid content-center pl-3'>
                            <div className='flex gap-2'>
                                <CodeLabel code={ticketData?.code} className={'flex justify-center text-xl  md:text-xl'} />
                                <PostTagIcon
                                    name={(ticketData?.status ? ticketStatusIdentifier(ticketData?.status, 'name') : '') as string}
                                    bgClass={(ticketData?.status ? ticketStatusIdentifier(ticketData?.status, 'class') : '') as string} />
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-end gap-2 pl-2'>
                        <TypeLabel label={(ticketData?.typeId ? _.get(ticketData, "typeId.name") : '') as string}/>
                        {/* <TypeLabel label={(ticketData?.type ? ticketTypeIdentifier(ticketData?.type, 'name') : '') as string}/> */}
                        <div className='grid content-center'>
                            {(
                                [_.get(ticketData, "serviceDepartment._id")].includes(_.get(user, "departmentOnDuty._id")) ||
                                [_.get(ticketData, "requestedBy._id")].includes(_.get(user, "_id"))
                                )
                                &&

                                <Link href={`${FrontPath.TICKET_UPDATE}/${ticketData?._id}`}><EditPackIcon /></Link>
                            }
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default TicketHead