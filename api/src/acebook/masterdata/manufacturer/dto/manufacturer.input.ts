import {
  InputType,
  ObjectType,
  PartialType,
  PickType,
  registerEnumType,
} from '@nestjs/graphql';
import { ManufacturerEnt } from '../entities/manufacturer.entity';
import { BulkManufacturerData } from './manufacturer.args';

enum Permission {
  SUPER_ADMIN = 'Super admin',
  STORE_OWNER = 'Store owner',
  STAFF = 'Staff',
  CUSTOMER = 'Customer',
}
registerEnumType(Permission, { name: 'restrictionmfst' });
@InputType()
export class UpsertManufacturerInput extends PickType(ManufacturerEnt, [
  'name',
  'mobile',
  '_id'
]){permission: Permission = Permission.CUSTOMER;}

@InputType()
export class ManufacturerId extends PickType(ManufacturerEnt, [
  '_id'
]){permission: Permission = Permission.CUSTOMER;}


@InputType()
export class BulkManucturer extends PickType(BulkManufacturerData, [
  'manufacturers'
]){permission: Permission = Permission.CUSTOMER;}
