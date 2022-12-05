import { ArgsType, ObjectType } from '@nestjs/graphql';

import { PaginationArgs } from '@/common/dto/pagination.args';

import { PaginatorInfo } from '@/common/dto/paginator-info.model';
import { NotifCounterEnt, NotifCounterEntSubs, NotificationEnt } from '../entities/notification.entity';
import { NotifMessageType } from '@/constants/notifications';
import { UserEntAB } from '@/users/entities/user.entity';

@ObjectType()
export class NotificationPaginator {
  data: NotificationEnt[];
  paginatorInfo: PaginatorInfo;
}

@ArgsType()
export class NotifArg extends PaginationArgs {
  userId?: string;
  departmentId?: string;
}

@ObjectType()
export class NotifCounterResp {
  data: NotifCounterEnt;
  user?: UserEntAB;
  paginatorInfo: PaginatorInfo;
}

// @ObjectType()
// export class NotifCounterSubsc {
//   data?: NotifCounterEntSubs;
// }

@ObjectType()
export class NotifCounterSubsc  {
  notViewed?: number;
  departments?: string[];
  toUserId?: string[];
}

@ArgsType()
export class NotifInternalArg {
  type?: string;
  code?: string;
  messageType?: NotifMessageType; //Type of message
  path?: string; //path of the notification
  pathSuffix?: string; //path of the notification
  departments?: string[];
  user?: string; // Name to display on the message
  userId?: string;
  fromUserId?: string; // User where the message from
  toUserId?: string; // User that will receive the notification
  toUserIdS?: string[]; // Userss that will receive the notification
  message?: string; // Partial or preview of the notifs
  entId?: string; // Entity ID , use for paths
  tags?: string[];
  ticketTypes?: string[];
  notifType?: string;
}

// @ArgsType()
// export class GetMusersArgs extends PaginationArgs {
//   username?: string;
// }
