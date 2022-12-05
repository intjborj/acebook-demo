import {
  InputType,
  ObjectType,
  PartialType,
  PickType,
  registerEnumType,
} from '@nestjs/graphql';
import { AccConfigEnt, AccConfigEntInput } from '../entities/accConfig.entity';

enum Permission {
  SUPER_ADMIN = 'Super admin',
  STORE_OWNER = 'Store owner',
  STAFF = 'Staff',
  CUSTOMER = 'Customer',
}
registerEnumType(Permission, { name: 'restrictionAC' });
@InputType()
export class UpdateAccConfigInput extends PickType(AccConfigEntInput, [
  'type',
  'notification',
  '_id'
]){permission: Permission = Permission.CUSTOMER;}

@InputType()
export class AccConfigId extends PickType(AccConfigEnt, [
  '_id'
]){permission: Permission = Permission.CUSTOMER;}
