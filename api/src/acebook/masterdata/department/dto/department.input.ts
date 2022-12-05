import {
  InputType,
  ObjectType,
  PartialType,
  PickType,
  registerEnumType,
} from '@nestjs/graphql';
import { DepartmentEnt } from '../entities/department.entity';

enum Permission {
  SUPER_ADMIN = 'Super admin',
  STORE_OWNER = 'Store owner',
  STAFF = 'Staff',
  CUSTOMER = 'Customer',
}
registerEnumType(Permission, { name: 'restriction' });
@InputType()
export class UpsertDepartmentInput extends PickType(DepartmentEnt, [
  'name',
  'description',
  '_id'
]){permission: Permission = Permission.CUSTOMER;}

@InputType()
export class DepartmenId extends PickType(DepartmentEnt, [
  '_id'
]){permission: Permission = Permission.CUSTOMER;}
