import Link from 'next/link'
import React from 'react'

type Props = {}

const HaveAccountLink = (props: Props) => {
    return (
        <div>
            <div className='italic text-slate-400 flex justify-center'>
                Already have an account? <span className=' pl-1 font-medium cursor-pointer'><Link href={'/login'}> Login here </Link></span>
            </div>
        </div>
    )
}

export default HaveAccountLink