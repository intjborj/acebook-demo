import {
  InputType,
  ObjectType,
  PartialType,
  PickType,
  registerEnumType,
} from '@nestjs/graphql';
import { FeedbackEnt, FeedbackInput } from '../entities/feedback.entity';

enum Permission {
  SUPER_ADMIN = 'Super admin',
  STORE_OWNER = 'Store owner',
  STAFF = 'Staff',
  CUSTOMER = 'Customer',
}
registerEnumType(Permission, { name: 'restrictionfeed' });
@InputType()
export class UpsertFeedbackInput extends PickType(FeedbackInput, [
  'feedback',
  'remarks',
  'category',
  '_id'
]){permission: Permission = Permission.CUSTOMER;}

@InputType()
export class FeedbackId extends PickType(FeedbackEnt, [
  '_id'
]){permission: Permission = Permission.CUSTOMER;}
