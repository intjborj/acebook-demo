import { Tickets } from '@/components/icons/category'
import { IconOne } from '@/components/icons/random/iconOne'
import { IconThree } from '@/components/icons/random/iconThree'
import { IconTwo } from '@/components/icons/random/iconTwo'
import Card from '@/components/ui/cards/card'
import Link from 'next/link'
import React from 'react'
import FucntionRestriction from '@/app/restrictions/system/function'

type Props = {}

const Configs = (props: Props) => {
    return (
        <>
            {/* <div className='flex justify-center'>
             <div className='w-3/6'>
                <div className=''> */}

            {/* <div className='w-full'> */}
            <div className='flex justify-center'>
                <div className='w-full md:w-3/6'>
                    <Link href={'/configurations/account'}>
                        <Card className='w-full md:w-full cursor-pointer flex md:p-2 mb-2'>
                            {/* <Tickets /> */}
                            <IconOne />
                            <span className='pl-5 grid content-center'>Account </span>
                        </Card>
                    </Link>
                    <FucntionRestriction code='CONFIG_ASSET_PAGE'>
                        <Link href={'/configurations/asset'}>
                            <Card className='w-full md:w-full cursor-pointer flex md:p-2 mb-2'>
                                {/* <Tickets /> */}
                                <IconThree />
                                <span className='pl-5 grid content-center'>Asset </span>
                            </Card>
                        </Link>
                    </FucntionRestriction>
                    <FucntionRestriction code='CONFIG_FEEDBACK_QA_PAGE'>
                        <Link href={'/feedback/categories'}>
                            <Card className='w-full md:w-full cursor-pointer flex  mb-2 md:p-2'>
                                {/* <Tickets /> */}
                                <IconTwo />
                                <span className='pl-5 grid content-center'> Feedback Question Settings </span>
                            </Card>
                        </Link>
                    </FucntionRestriction>
                    <FucntionRestriction code='CONFIG_INVESTORS_PAGE'>
                        <Link href={'/investors/configuration'}>
                            <Card className='w-full md:w-full cursor-pointer flex md:p-2 mb-2'>
                                {/* <Tickets /> */}
                                <IconThree />
                                <span className='pl-5 grid content-center'>Investors Settings </span>
                            </Card>
                        </Link>
                    </FucntionRestriction>
                    <FucntionRestriction code='CONFIG_PROMOTION_PAGE'>
                        <Link href={'/promotions'}>
                            <Card className='w-full md:w-full cursor-pointer flex md:p-2 mb-2'>
                                {/* <Tickets /> */}
                                <IconTwo />
                                <span className='pl-5 grid content-center'>Promotions </span>
                            </Card>
                        </Link>
                    </FucntionRestriction>
                    <FucntionRestriction code='CONFIG_TICKET_TYPE_PAGE'>
                        <Link href={'/tickets/types'}>
                            <Card className='w-full md:w-full cursor-pointer flex mb-2 md:p-2'>
                                <IconOne />
                                {/* <Tickets /> */}
                                <span className='pl-5 grid content-center'> Ticket Settings </span>
                            </Card>
                        </Link>
                    </FucntionRestriction>




                </div>
            </div>

            {/* </div>
             </div>
         </div> */}
        </>
    )
}

export default Configs