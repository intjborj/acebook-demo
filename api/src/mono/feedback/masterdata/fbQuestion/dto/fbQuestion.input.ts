import {
  InputType,
  ObjectType,
  PartialType,
  PickType,
  registerEnumType,
} from '@nestjs/graphql';
import { FbQuestionEnt } from '../entities/fbQuestion.entity';

enum Permission {
  SUPER_ADMIN = 'Super admin',
  STORE_OWNER = 'Store owner',
  STAFF = 'Staff',
  CUSTOMER = 'Customer',
}
registerEnumType(Permission, { name: 'restrictionfbq' });
@InputType()
export class UpsertFbQuestionInput extends PickType(FbQuestionEnt, [
 
  'question',
  'description',
  '_id'
]){permission: Permission = Permission.CUSTOMER;}

@InputType()
export class FbQuestionId extends PickType(FbQuestionEnt, [
  '_id'
]){permission: Permission = Permission.CUSTOMER;}
