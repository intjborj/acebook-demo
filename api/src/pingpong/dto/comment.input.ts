import {
  InputType,
  ObjectType,
  PartialType,
  PickType,
  registerEnumType,
} from '@nestjs/graphql';
import { PingInputEnt } from '../entities/ping.entity';

enum Permission {
  SUPER_ADMIN = 'Super admin',
  STORE_OWNER = 'Store owner',
  STAFF = 'Staff',
  CUSTOMER = 'Customer',
}
registerEnumType(Permission, { name: 'restrictionping' });

@InputType()
export class PingInpt extends PickType(PingInputEnt, [
  'repoFullName'
]){permission: Permission = Permission.CUSTOMER;}
