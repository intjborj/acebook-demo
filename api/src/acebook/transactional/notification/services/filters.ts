import { NotifArg } from "../dto/notification.args"
var ObjectId = require('mongoose').Types.ObjectId;

export const notifCountFilter =(payload: NotifArg)=>{
  return  {
        $and: [
          { $or: [{ user: new ObjectId(payload.userId) }, { department: new ObjectId(payload.departmentId) }, { notifyAll: true }] },
          {
            views: {
              $not: {
                $elemMatch: {
                  'user': new ObjectId(payload.userId)
                }
              }
            }
          }
        ]
      }
}