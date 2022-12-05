import {
  InputType,
  ObjectType,
  PartialType,
  PickType,
  registerEnumType,
} from '@nestjs/graphql';
import { AttachmentEnt } from '../entities/attachment.entity';

enum Permission {
  SUPER_ADMIN = 'Super admin',
  STORE_OWNER = 'Store owner',
  STAFF = 'Staff',
  CUSTOMER = 'Customer',
}
registerEnumType(Permission, { name: 'restrictionAtt' });
@InputType()
export class UpsertAttachmentInput extends PickType(AttachmentEnt, [
  'path',
  'type',
  'createdBy',
  'comments',
  'refId',
  'originCollection',
  'reactions',
  'customTags',
  '_id'
]){permission: Permission = Permission.CUSTOMER;}

@InputType()
export class AttachmentId extends PickType(AttachmentEnt, [
  '_id'
]){permission: Permission = Permission.CUSTOMER;}
