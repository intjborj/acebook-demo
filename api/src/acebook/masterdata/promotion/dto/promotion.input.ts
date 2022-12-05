import {
  InputType,
  ObjectType,
  PartialType,
  PickType,
  registerEnumType,
} from '@nestjs/graphql';
import { PromotionEnt, PromotionEntInput } from '../entities/promotion.entity';

enum Permission {
  SUPER_ADMIN = 'Super admin',
  STORE_OWNER = 'Store owner',
  STAFF = 'Staff',
  CUSTOMER = 'Customer',
}
registerEnumType(Permission, { name: 'restrictionPR' });
@InputType()
export class UpsertPromotionInput extends PickType(PromotionEntInput, [
  'paths',
  '_id'
]){permission: Permission = Permission.CUSTOMER;}

@InputType()
export class PromotionId extends PickType(PromotionEnt, [
  '_id'
]){permission: Permission = Permission.CUSTOMER;}
