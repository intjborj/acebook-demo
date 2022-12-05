import {
  InputType,
  ObjectType,
  PartialType,
  PickType,
  registerEnumType,
} from '@nestjs/graphql';
import { TicketEnt, TicketInput } from '../entities/ticket.entity';

enum Permission {
  SUPER_ADMIN = 'Super admin',
  STORE_OWNER = 'Store owner',
  STAFF = 'Staff',
  CUSTOMER = 'Customer',
}
registerEnumType(Permission, { name: 'restrictiontk' });
@InputType()
export class UpsertTicketInput extends PickType(TicketInput, [
  '_id',
  'code',
  'description',
  'type',
  'typeId',
  'dateNeeded',
  'dateRequested',
  'subject',
  'status',
  'location',
  'createdBy',
  'requestedBy',
  'serviceDepartment',
  'requestingDepartment',
  'comments',
  'reactions',
  'postOrigin',
  // 'works',
  'approvers',
  'attachments',
  'assignedPersonnel',
  'toDo',
  'asset',
  'remarks',
  'isOverride',
  'clientFeedback',
  
]){permission: Permission = Permission.CUSTOMER;}

@InputType()
export class TicketId extends PickType(TicketEnt, [
  '_id'
]){permission: Permission = Permission.CUSTOMER;}
