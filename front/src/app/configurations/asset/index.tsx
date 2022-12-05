import { Tickets } from '@/components/icons/category'
import { IconOne } from '@/components/icons/random/iconOne'
import { IconThree } from '@/components/icons/random/iconThree'
import { IconTwo } from '@/components/icons/random/iconTwo'
import Card from '@/components/ui/cards/card'
import Link from 'next/link'
import React from 'react'
import FucntionRestriction from '@/app/restrictions/system/function'
import { FrontPath } from '@/constants/enums/paths'

type Props = {}

const AssetConfigsApp = (props: Props) => {
    return (
        <>
            {/* <div className='flex justify-center'>
             <div className='w-3/6'>
                <div className=''> */}

            {/* <div className='w-full'> */}
            <div className='flex justify-center'>
                <div className='w-full md:w-3/6'>
                    <FucntionRestriction code='CONFIG_MANUFACTURER_PAGE'>
                        <Link href={'/configurations/asset/manufacturer'}>
                            <Card className='w-full md:w-full cursor-pointer flex md:p-2 mb-2'>
                                {/* <Tickets /> */}
                                <IconOne />
                                <span className='pl-5 grid content-center'>Manufacturer </span>
                            </Card>
                        </Link>
                    </FucntionRestriction>
                     <FucntionRestriction code='CONFIG_SUPPLIER_PAGE'>
                        <Link href={'/configurations/asset/supplier'}>
                            <Card className='w-full md:w-full cursor-pointer flex md:p-2 mb-2'>
                                {/* <Tickets /> */}
                                <IconOne />
                                <span className='pl-5 grid content-center'>Supplier </span>
                            </Card>
                        </Link>
                    </FucntionRestriction>
                    <FucntionRestriction code='CONFIG_ASSET_LIST_PAGE'>
                        <Link href={FrontPath.ASSET_LIST}>
                            <Card className='w-full md:w-full cursor-pointer flex md:p-2 mb-2'>
                                {/* <Tickets /> */}
                                <IconOne />
                                <span className='pl-5 grid content-center'>Asset List </span>
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

export default AssetConfigsApp