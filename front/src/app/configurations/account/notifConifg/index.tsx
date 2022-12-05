import Card from '@/components/admin/components/common/card'
import SwitchInput from '@/components/admin/components/ui/switch-input'
import { ABSwitch } from '@/components/customs/forms/ABSwitch';
import ABDisplaySectionLabel from '@/components/customs/layouts/ABDisplaySectionLabel'
import { LabelColor } from '@/constants/enums/themes';
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import { AccConfigContext } from '..';
import { useQuery, useMutation } from '@apollo/client';
import { UPDATE_ACC_CONFIG } from '@graphql/operations/accounts/accountMutations';
import { toast } from 'react-toastify';
import { getAuthCredentials } from '@/utils/auth-utils';
import Cookies from 'js-cookie';
import _ from 'lodash';


type Props = {}
type FormVals = {
    isSilent?: boolean;
}

const NotifConfig = (props: Props) => {
    const { id: userId } = getAuthCredentials()
    const { notification } = useContext(AccConfigContext) || {};
    const [state, setState] = useState<FormVals>({ isSilent: notification?.isEnabled })
   
    const [updateConfig] = useMutation(UPDATE_ACC_CONFIG);

    const processUpdate = (payload: any) => {
        updateConfig({
            variables: {
                input: {
                    _id: userId,
                    ...payload
                }
            },
        })
            .then((resp) => {
                // console.log("resp", resp)
                // toast.success('Configuration successfully updated');

            })
            .catch((error) => {
                // console.log("error", error)
                // toast.error('Failed to update onfiguration');
            });
    }

    const handleUpdate = (data: any, type: string) => {
        if (type === "sound") {
            setState((p) => ({ ...p, isSilent: _.get(data, "notification.isEnabled") }))
        }
      
        setTimeout(() => {
            processUpdate(data)
        }, 2000);

    }


    return (
        <div className='pt-3'>
            <Card>
                <ABDisplaySectionLabel>Notification</ABDisplaySectionLabel>
                <div className={`flex gap-2 ${LabelColor.SECONDARY} `}>
                    <ABSwitch value={notification?.isEnabled}
                        onChange={(data: boolean) => handleUpdate({ "notification": { "isEnabled": data } }, "sound")}
                    />
                    <span>Turn on notification sound</span>
                    {/* <span>{state?.isSilent ? 'Disable' : 'Enable'} notification sound</span> */}
                </div>


            </Card>
        </div>
    )
}

export default NotifConfig