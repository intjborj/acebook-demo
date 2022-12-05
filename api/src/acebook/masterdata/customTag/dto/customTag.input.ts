import {
  InputType,
  ObjectType,
  PartialType,
  PickType,
  registerEnumType,
} from '@nestjs/graphql';
import { CustomTagEnt } from '../entities/customTag.entity';

enum Permission {
  SUPER_ADMIN = 'Super admin',
  STORE_OWNER = 'Store owner',
  STAFF = 'Staff',
  CUSTOMER = 'Customer',
}
registerEnumType(Permission, { name: 'restrictionct' });
@InputType()
export class UpsertCustomTagInput extends PickType(CustomTagEnt, [
  'name',
  'description',
  '_id'
]){permission: Permission = Permission.CUSTOMER;}

@InputType()
export class CustomTagId extends PickType(CustomTagEnt, [
  '_id'
]){permission: Permission = Permission.CUSTOMER;}
