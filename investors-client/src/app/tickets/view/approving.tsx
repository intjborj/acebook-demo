import Button from '@/components/ui/button'
import React from 'react'

type Props = {
    action?: any
    displayAll?: boolean
}

const Approving = ({ action, displayAll }: Props) => {
    return (
        <div className='flex gap-5 pt-10 justify-center' >
            {displayAll ?
                <>
                    <Button size='small' onClick={e => action("approved")}>Approve</Button>
                    <Button  size='small' onClick={e => action("disapproved")}>Disapprove</Button>
                </>:
                 <Button  size='small'  onClick={e => action("edit")}>Edit Approval</Button>
            }
        </div>
    )
}

export default Approving