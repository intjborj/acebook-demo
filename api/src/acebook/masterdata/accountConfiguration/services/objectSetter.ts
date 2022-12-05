import { isEmpty } from "class-validator";
import { UpdateAccConfigInput } from "../dto/accConfig.input";

export const ACObjectSetter = ({notification} : UpdateAccConfigInput)=>{
    let payload = {}
    

    if(!isEmpty(notification.isEnabled)){
        payload = {...payload, ...{"configurations.notification.isEnabled": notification.isEnabled }}
    }
    if(!isEmpty(notification.ringtone)){
        payload = {...payload, ...{"configurations.notification.ringtone": notification.ringtone }}
    }
  
    return payload
}