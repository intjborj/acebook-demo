import {
  InputType,
  ObjectType,
  PartialType,
  PickType,
  registerEnumType,
} from '@nestjs/graphql';
import { NotificationEnt, NotificationEntInput } from '../entities/notification.entity';

enum Permission {
  SUPER_ADMIN = 'Super admin',
  STORE_OWNER = 'Store owner',
  STAFF = 'Staff',
  CUSTOMER = 'Customer',
}
registerEnumType(Permission, { name: 'restrictionnt' });
@InputType()
export class UpsertNotificationInput extends PickType(NotificationEntInput, [
  'notifyAll',
  'department',
  'message',
  'path',
  'user',
  'views',
  '_id'
]){permission: Permission = Permission.CUSTOMER;}

@InputType()
export class NotificationId extends PickType(NotificationEnt, [
  '_id'
]){permission: Permission = Permission.CUSTOMER;}
