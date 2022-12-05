import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { CoreEntity, CoreEntityMg } from '@/common/entities/core.entity';
import { AttachmentInptObj } from '@/acebook/transactional/attachment/entities/attachment.entity';
import { TicketEnt } from '../../ticket/entities/ticket.entity';
import { SubmissionDeptEnt, SubmissionDeptEntInput } from '@/acebook/referenceType/submissionDepartment.entity';
import { UserEntAB } from '@/users/entities/user.entity';
import { AssetVariationEnt } from '@/acebook/masterdata/assetVariation/entities/assetVariation.entity';

@ObjectType()
export class WorkDetailEntCommon extends CoreEntityMg {
  // name: string;
  // description: string;
  dateTimeStarted?: string;
  dateTimeFinished?: string;
  workStatus?: string;
  findings?: string;
  descActualWorkDone?: string;
  code?: string;
  attachments?: AttachmentInptObj[];
  isArchived?: boolean;
  remarks?: string;
  archiveRemarks?: string;
  workCategory?: string;
}

@ObjectType()
export class WorkDetailEnt extends WorkDetailEntCommon {
  ticket?: TicketEnt
  submissionDepartment?: SubmissionDeptEnt[];
  performedBy?: UserEntAB[];
  assetVariation?: AssetVariationEnt[];
}


@InputType('WorkDetailInputType', { isAbstract: true })
@ObjectType()
export class WorkDetailEntInput extends WorkDetailEntCommon {
  ticketId?: string;
  submissionDepartment?: SubmissionDeptEntInput[];
  performedBy?: string[];
  assetVariation?: string[];
} 
