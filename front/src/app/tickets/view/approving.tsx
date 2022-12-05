import Button from '@/components/ui/button'
import ABButton from '@/components/ui/buttons/ABbutton'
import React from 'react'

type Props = {
    action?: any
    displayAll?: boolean
}

const Approving = ({ action, displayAll }: Props) => {
    return (
        <div className='flex  pt-4 justify-center gap-2' >
            {displayAll ?
                <>
                    <ABButton onClick={() => action("approved")}>Approve</ABButton>
                    <ABButton onClick={() => action("disapproved")}>Disapprove</ABButton>
                </> :
                <ABButton onClick={() => action("edit")}>Edit Approval</ABButton>
            }
        </div>
    )
}

export default Approving