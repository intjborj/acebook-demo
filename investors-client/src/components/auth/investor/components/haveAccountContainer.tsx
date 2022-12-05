import BorderDashed from '@/components/ui/border'
import Link from 'next/link'
import React from 'react'
import HaveAccountLink from './haveAccountLink'

type Props = {}

const HaveAccountContainer = (props: Props) => {
    return (
        <div>
            <div className='pt-5'>
                <BorderDashed />
            </div>
            <div className='pt-5'>
                <HaveAccountLink />
            </div>
        </div>
    )
}

export default HaveAccountContainer