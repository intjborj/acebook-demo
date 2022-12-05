import { Injectable } from '@nestjs/common';
import { paginate } from '@/common/pagination/paginate';
import { NotifCounterEntSubs, NotificationEnt, NotificationEntInput } from './entities/notification.entity';
import Notification from '@models/Transactionals/Notifications';
import { NotificationId, UpsertNotificationInput } from './dto/notification.input';
import { PaginationArgs } from '@/common/dto/pagination.args';
import { NotifArg, NotifCounterSubsc, NotifInternalArg } from './dto/notification.args';
import MUser from '@models/User';
import { NOTIF_COUNT_EN } from '@/acebook/constants/qgl_subscriptions/publishers';
import { PubSubNotif } from './notification.resolvers';
import { notifComment, notifDefault, notifDepartment } from './services/customServices';
import { notifCountFilter } from './services/filters';
import _ from 'lodash'
import { UserEntAB } from '@/users/entities/user.entity';
import { sendSmsNotif, SmSNotifService, smsProcess } from './services/smsNotifService';
import { NotifMessageType, SmsNotifTypes } from '@/constants/notifications';

var ObjectId = require('mongoose').Types.ObjectId;

@Injectable()
export class NotificationService {
  // constructor(private readonly smsNotifService: SmSNotifService) { }

  async upsert(upsertInput: UpsertNotificationInput): Promise<NotificationEnt> {
    let savedData;
    if (upsertInput._id) {

      if (upsertInput.views) {
        savedData = await Notification.findOneAndUpdate(
          { _id: upsertInput._id },
          {
            $push: {
              views: {
                user: new ObjectId(upsertInput.views.user),
                viewDate: upsertInput.views.viewDate
              }
            }
          },
          { new: true },
        );
      }

    } else {
      savedData = new Notification(upsertInput);
      await savedData.save();
    }


    return savedData;
  }

  async delete(upsertInput: NotificationId): Promise<NotificationEnt> {
    let removedData = await Notification.findOneAndDelete({
      _id: upsertInput._id,
    });

    return removedData;
  }

  async findAll({ page, first }: PaginationArgs) {
    const notification: NotificationEnt[] = await Notification.find();
    return {
      data: notification,
      paginatorInfo: paginate(
        notification.length,
        page,
        first,
        notification.length,
      ),
    };
  }

  async findByUser(payload: NotifArg) {

    // === initial ====
    // const notification: NotificationEnt[] = await Notification.find(
    //   {
    //     $or: [{ user: new ObjectId(payload.userId) }, { department: new ObjectId(payload.departmentId) }, { notifyAll: true }]
    //   }
    // ).populate({ path: 'views.user', model: 'MUser' });
    // === initial ====


    // ==== testing ====
    let notification: NotificationEnt[] = await Notification.aggregate(
      [
        {
          $match:
          {
            $or: [{ user: new ObjectId(payload.userId) }, { department: new ObjectId(payload.departmentId) }, { notifyAll: true }]
          }
        },
        {
          $project: {
            created_at: 1,
            message: 1,
            path: 1,
            tags: 1,
            ticketTypes: 1,
            views: {
              $filter: {
                input: "$views",
                as: "view",
                cond: { $eq: ["$$view.user", new ObjectId(payload.userId)] }
              }
            },
          }
        },
        { $unwind: { path: "$tags", "preserveNullAndEmptyArrays": true } },
        {
          $lookup: {
            "from": "customtags",
            "localField": "tags",
            "foreignField": "code",
            "as": "tagObjects"
          }
        },
        { $unwind: { path: "$tagObjects", "preserveNullAndEmptyArrays": true } },
        { $unwind: { path: "$ticketTypes", "preserveNullAndEmptyArrays": true } },
        {
          $lookup: {
            "from": "tickettypes",
            "localField": "ticketTypes",
            "foreignField": "code",
            "as": "ticketTypesObjects"
          }
        },
        { $unwind: { path: "$ticketTypesObjects", "preserveNullAndEmptyArrays": true } },
        {
          $group: {
            _id: "$_id",
            created_at: { $first: "$created_at" },
            message: { $first: "$message" },
            path: { $first: "$path" },
            views: { $first: "$views" },
            tags: {
              $addToSet: {
                code: '$tagObjects.code',
                name: '$tagObjects.name'
              }
            },
            // tags: { $push: "$tagObjects" },
            ticketTypes: {
              $addToSet: { //use $addToSet if morethan one array you are working, prevents duplication
                code: '$ticketTypesObjects.code',
                name: '$ticketTypesObjects.name'
              }
            },
            // ticketTypes: { $push: "$ticketTypesObjects" }, //use $push if only one array you are working, no duplication if one array only
            // tagObjects: { $push: "$tagObjects"  },
          }
        },
        { $sort: { created_at: -1 } },
        { $limit: 100 },
      ]
    );

    // console.log(notification)
    // console.log(_.get(notification[0], "tagObjects"))
    // .populate({ path: 'views.user', model: 'MUser' });
    // ==== testing ====

    // notification = await Notification.populate(notification, {path: 'tags', model: 'CustomTag', key: 'code'})
    return {
      data: notification,
      paginatorInfo: paginate(
        notification.length,
        payload.page,
        payload.first,
        notification.length,
      ),
    };
  }

  async notifCounter(payload: NotifArg) {
    const notifFA: NotificationEnt = await Notification.find(notifCountFilter(payload)).count()
    const userData: UserEntAB = await MUser.findOne({ _id: payload.userId })
    // const notifFA: NotificationEnt = await Notification.find({user: new ObjectId(payload.userId), viewDate: null}).count()

    return {
      data: {
        notViewed: notifFA
      },
      user: userData
    }
  }



  async notifier({ type, ...data }: NotifInternalArg) {
    
    let user = ""
    // this.smsNotifService.smsNotif()
    // sendSmsNotif()
    if (data.fromUserId) {
      let userData = MUser.findOne({ _id: data.fromUserId })
      let udataAw = await userData
      if (udataAw) {
        user = udataAw?.firstName + ' ' + udataAw?.lastName
      }


    }

    let payload = {}
    let resNotif = {}

    switch (type) {
      case "department":
        payload = {
          user: user,
          notifType: type,
          ...data
        }
        resNotif = await notifDepartment(payload)

        notifPublish(payload, resNotif)

        break;

      case "comment":
        payload = {
          user: user,
          ...data
        }
        resNotif = await notifComment(payload)
        notifPublish(payload, resNotif)
        break;

      default:
        payload = {
          user: user,
          ...data
        }
        resNotif = await notifDefault(payload)

        notifPublish(payload, resNotif)
        break;
    }





  }

}


async function notifPublish(payload: NotifInternalArg, resNotif?: any) {
  let users = payload.toUserIdS ?? [payload.toUserId]

  if (resNotif?.message && (SmsNotifTypes.includes(payload.notifType as NotifMessageType) || SmsNotifTypes.includes(payload.messageType))) {
    // sendSmsNotif({ number: '09058824789', message: resNotif.message })
    smsProcess({departments: payload.departments, users: users, message: resNotif.message, path: resNotif.path})
  }

  const viewAdd: NotifCounterSubsc = {
    notViewed: 1,
    departments: payload.departments,
    toUserId: users,
    // toUserId: payload.toUserIdS ?? [payload.toUserId],
  }

  PubSubNotif.publish(NOTIF_COUNT_EN,
    {
      subscNotifCount: viewAdd
    }
  );
}


