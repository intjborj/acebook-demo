import Card from '@/components/admin/components/common/card'
import EditPackIcon from '@/components/customs/iconPackage/editPack-icon'
import ABDisplaySectionLabel from '@/components/customs/layouts/ABDisplaySectionLabel'
import { PropForm } from '@/types/forms/propHookForm'
import { isEmpty } from 'lodash'
import React, { useState, useEffect } from 'react'
import { boolean } from 'yup'
import TicketEmptyFeedback from '../svg/emptyFeedback'
import TicketEmptyFolder from '../svg/emptyFolder'
import FbMessageDisplay from './components/display/fbMessageDisplay'
import ClientFeedbackForm from './components/form'

type Props = {
    hookFormProp: PropForm;
    onSubmit?: (data: any) => void;
    isUser?: boolean;
    hasMessage?: boolean;
    message?: string;
    updatedAt?: string;
}

const ClientFeedback = ({ hookFormProp, onSubmit, hasMessage = true, isUser, message, updatedAt }: Props) => {
    const [enableEdit, setEnableEdit] = useState<boolean>(true)


    useEffect(() => {
        setEnableEdit(hasMessage ? false : true)
    }, [hasMessage])


    const submitCallback = () => {
        setTimeout(function () {
            setEnableEdit(false)
        }, 500);
    }



    return (
        <div>
           <Card>
                <div className=' grid grid-cols-2'>
                    <ABDisplaySectionLabel>Client Feedback</ABDisplaySectionLabel>
                    {(isUser && enableEdit == false) && <div className=' flex justify-end' onClick={() => setEnableEdit(true)}> <EditPackIcon /></div>}
                </div>
                {!isUser && isEmpty(message)? <TicketEmptyFeedback/> : <></>}
                {enableEdit == false && <FbMessageDisplay message={message} />}
                {(enableEdit == true && isUser) && <ClientFeedbackForm
                    isCancellable={hasMessage}
                    hookFormProp={hookFormProp}
                    onSubmit={onSubmit}
                    submitCallback={submitCallback}
                    cancelCallback={()=>{setEnableEdit(false)}} />}


            </Card>
        </div>
    )
}

export default ClientFeedback