import {
  InputType,
  ObjectType,
  PartialType,
  PickType,
  registerEnumType,
} from '@nestjs/graphql';
import { SupplierEnt } from '../entities/supplier.entity';
import { BulkSupplierData } from './supplier.args';

enum Permission {
  SUPER_ADMIN = 'Super admin',
  STORE_OWNER = 'Store owner',
  STAFF = 'Staff',
  CUSTOMER = 'Customer',
}
registerEnumType(Permission, { name: 'restrictionmspp' });
@InputType()
export class UpsertSupplierInput extends PickType(SupplierEnt, [
  'name',
  'migrationId',
  'mobile',
  'email',
  'url',
  'information',
  'address',
  'contactPerson',
  'contactTelephone',
  'contactEmail',
  '_id'
]){permission: Permission = Permission.CUSTOMER;}

@InputType()
export class SupplierId extends PickType(SupplierEnt, [
  '_id'
]){permission: Permission = Permission.CUSTOMER;}


@InputType()
export class BulkSupplier extends PickType(BulkSupplierData, [
  'suppliers'
]){permission: Permission = Permission.CUSTOMER;}
