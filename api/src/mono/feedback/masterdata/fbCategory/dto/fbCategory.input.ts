import {
  InputType,
  ObjectType,
  PartialType,
  PickType,
  registerEnumType,
} from '@nestjs/graphql';
import { FbCategoryEnt } from '../entities/fbCategory.entity';

enum Permission {
  SUPER_ADMIN = 'Super admin',
  STORE_OWNER = 'Store owner',
  STAFF = 'Staff',
  CUSTOMER = 'Customer',
}
registerEnumType(Permission, { name: 'restrictionfbc' });
@InputType()
export class UpsertFbCategoryInput extends PickType(FbCategoryEnt, [
  'name',
  'icon',
  'color',
  'description',
  '_id'
]){permission: Permission = Permission.CUSTOMER;}

@InputType()
export class FbCategoryId extends PickType(FbCategoryEnt, [
  '_id'
]){permission: Permission = Permission.CUSTOMER;}
