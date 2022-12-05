import {
  InputType,
  ObjectType,
  PartialType,
  PickType,
  registerEnumType,
} from '@nestjs/graphql';
import { PollDetailsEnt } from '../entities/pollDetails.entity';

enum Permission {
  SUPER_ADMIN = 'Super admin',
  STORE_OWNER = 'Store owner',
  STAFF = 'Staff',
  CUSTOMER = 'Customer',
}
registerEnumType(Permission, { name: 'restrictionpt' });
@InputType()
export class UpsertPollDetailsInput extends PickType(PollDetailsEnt, [
  'period',
  'votingOpen',
  'candidates',
  'isCurrentTerm',
  'userId',
  '_id'
]){permission: Permission = Permission.CUSTOMER;}

@InputType()
export class PollDetailsId extends PickType(PollDetailsEnt, [
  '_id'
]){permission: Permission = Permission.CUSTOMER;}
