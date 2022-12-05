import {
  InputType,
  ObjectType,
  PartialType,
  PickType,
  registerEnumType,
} from '@nestjs/graphql';
import { BodPollCandidateEnt } from '../entities/bodPollCandidate.entity';

enum Permission {
  SUPER_ADMIN = 'Super admin',
  STORE_OWNER = 'Store owner',
  STAFF = 'Staff',
  CUSTOMER = 'Customer',
}
registerEnumType(Permission, { name: 'restrictionct' });
@InputType()
export class UpsertBodPollCandidateInput extends PickType(BodPollCandidateEnt, [
  'name',
  'description',
  '_id'
]){permission: Permission = Permission.CUSTOMER;}

@InputType()
export class BodPollCandidateId extends PickType(BodPollCandidateEnt, [
  '_id'
]){permission: Permission = Permission.CUSTOMER;}
