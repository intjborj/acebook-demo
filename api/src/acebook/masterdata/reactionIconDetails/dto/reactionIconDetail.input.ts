import {
  InputType,
  ObjectType,
  PartialType,
  PickType,
  registerEnumType,
} from '@nestjs/graphql';
import { ReactionIconDetailEnt } from '../entities/reactionIconDetail.entity';

enum Permission {
  SUPER_ADMIN = 'Super admin',
  STORE_OWNER = 'Store owner',
  STAFF = 'Staff',
  CUSTOMER = 'Customer',
}
registerEnumType(Permission, { name: 'restrictionRid' });
@InputType()
export class UpsertReactionIconDetailInput extends PickType(ReactionIconDetailEnt, [
  'name',
  'path',
  '_id'
]){permission: Permission = Permission.CUSTOMER;}

@InputType()
export class ReactionIconDetailId extends PickType(ReactionIconDetailEnt, [
  '_id'
]){permission: Permission = Permission.CUSTOMER;}
