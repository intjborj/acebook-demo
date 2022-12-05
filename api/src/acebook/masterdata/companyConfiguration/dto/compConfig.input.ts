import {
  InputType,
  ObjectType,
  PartialType,
  PickType,
  registerEnumType,
} from '@nestjs/graphql';
import { CompConfigEnt } from '../entities/compConfig.entity';

enum Permission {
  SUPER_ADMIN = 'Super admin',
  STORE_OWNER = 'Store owner',
  STAFF = 'Staff',
  CUSTOMER = 'Customer',
}
registerEnumType(Permission, { name: 'restrictionccc' });
@InputType()
export class UpsertCompConfigInput extends PickType(CompConfigEnt, [
  'investor',
  '_id'
]){permission: Permission = Permission.CUSTOMER;}

@InputType()
export class CompConfigId extends PickType(CompConfigEnt, [
  '_id'
]){permission: Permission = Permission.CUSTOMER;}
