import {
  InputType,
  ObjectType,
  PartialType,
  PickType,
  registerEnumType,
} from '@nestjs/graphql';
import { RestrictionEnt } from '../entities/restriction.entity';

enum Permission {
  SUPER_ADMIN = 'Super admin',
  STORE_OWNER = 'Store owner',
  STAFF = 'Staff',
  CUSTOMER = 'Customer',
}
registerEnumType(Permission, { name: 'restrictionrt' });
@InputType()
export class UpsertRestrictionInput extends PickType(RestrictionEnt, [
  'code',
  'path',
  'type',
  'description',
  '_id'
]){permission: Permission = Permission.CUSTOMER;}

@InputType()
export class RestrictionId extends PickType(RestrictionEnt, [
  '_id'
]){permission: Permission = Permission.CUSTOMER;}
