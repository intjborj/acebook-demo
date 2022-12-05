
import Notification from '@models/Transactionals/Notifications';
import {  NotifInternalArg } from '../dto/notification.args';
import { notifMessage, NotifMessageType } from '@/constants/notifications';
import { NotifTags } from './enums';
import { sendSmsNotif } from './smsNotifService';

var ObjectId = require('mongoose').Types.ObjectId;
// ======= ACESSIBLE FUNCTIONS ======== //



export async function notifDepartment({ departments, user, message, entId }: NotifInternalArg) {

    if (departments) {
      let objdepts = departments.map(s => new ObjectId(s));
      // departments.map(async (item: any) => {
      let payload = {
        message: notifMessage({ type: NotifMessageType.POST_TAG, fromUserName: user, message: message }),
        path: `/post/${entId}`,
        department: objdepts,
        tags: [NotifTags.POST,NotifTags.TAGGED_DEPARTMENT]
      }
  
      let savedData = new Notification(payload);
      await savedData.save();
  
      return await savedData
      // })
  
      // departments.map(async (item: any) => {
      //   let payload = {
      //     message: notifDepartmentMessage({ type: "post_tag", user: user, message: message }),
      //     path: `/post/${entId}`,
      //     department: item
      //   }
  
      //   let savedData = new Notification(payload);
      //   await savedData.save();
      // })
    }
  
  
  }
  
  export async function notifComment({ departments, user, message, entId, ...data }: NotifInternalArg) {
  
    let payload = {
      message: notifMessage({ type: NotifMessageType.POST_COMMENT, fromUserName: user, message: message }),
      path: `/post/${entId}`,
      user: [data.toUserId],
      tags: [NotifTags.POST,NotifTags.COMMENT]
    }
  
    let savedData = new Notification(payload);
    await savedData.save();
  
    return await savedData
  
  }


  export async function notifDefault({ departments, user, message, entId, ...data }: NotifInternalArg) {
  
    let payload = {
      message: notifMessage({ type: data.messageType, fromUserName: user, message: message, code:data.code }),
      path: `${data.path}/${entId}${data.pathSuffix ?? ``}`,
      user: data.toUserIdS ??  [data.toUserId],
      tags: data.tags,
      ticketTypes:  data.ticketTypes,
      department: departments ?? []
    }
 
  
    let savedData = new Notification(payload);
    await savedData.save();
  
    return await savedData
  
  }