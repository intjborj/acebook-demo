import {
  InputType,
  ObjectType,
  PartialType,
  PickType,
  registerEnumType,
} from '@nestjs/graphql';
import { WorkDetailEnt, WorkDetailEntInput } from '../entities/workDetail.entity';

enum Permission {
  SUPER_ADMIN = 'Super admin',
  STORE_OWNER = 'Store owner',
  STAFF = 'Staff',
  CUSTOMER = 'Customer',
}
registerEnumType(Permission, { name: 'restrictionctwd' });
@InputType()
export class UpsertWorkDetailInput extends PickType(WorkDetailEntInput, [
  'dateTimeStarted',
  'dateTimeFinished',
  'workStatus',
  'findings',
  'ticketId',
  'descActualWorkDone',
  'attachments',
  'code',
  'isArchived',
  'submissionDepartment',
  'performedBy',
  'assetVariation',
  'archiveRemarks',
  'workCategory',
  '_id'
]){permission: Permission = Permission.CUSTOMER;}

@InputType()
export class WorkDetailId extends PickType(WorkDetailEnt, [
  '_id'
]){permission: Permission = Permission.CUSTOMER;}
