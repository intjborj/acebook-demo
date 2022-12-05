import { DepartmentEnt } from '@/acebook/masterdata/department/entities/department.entity';
import { ApproverEnt, ApproverEntInput } from '@/acebook/referenceType/approver.entity';
import { UserEntAB } from '@/users/entities/user.entity';
import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { CoreEntity, CoreEntityMg } from '@/common/entities/core.entity';
import { AttachmentEnt, AttachmentInptObj } from '../../attachment/entities/attachment.entity';
import { CommentEnt } from '../../comment/entities/comment.entity';
import { PostEnt } from '../../post/entities/post.entity';
import { AssignedPersonnelEnt, AssignedPersonnelEntInput } from '@/acebook/referenceType/assignedPersonnel.entity';
import { WorkDetailEnt } from '../../workDetail/entities/workDetail.entity';
import { TicketTypeEnt } from '../../ticketType/entities/ticketType.entity';
import { ToDoEnt } from '@/acebook/referenceType/toDo.entity';
import { AssetEnt } from '@/acebook/masterdata/asset/entities/asset.entity';
import { ClientFeedbackEnt, ClientFeedbackInputEnt } from '@/acebook/referenceType/feedBack.entity';

export enum TicketStatusType {
  DRAFT = 'draft',
  PENDING = 'pending',
  DISAPPROVE = 'disapproved',
}

@ObjectType()
export class TicketEntCommon extends CoreEntityMg {

  code?: string;
  description?: string;
  type?: string;
  dateNeeded?: string;
  dateRequested?: string;
  subject?: string;
  // status?: TicketStatusType;
  status?: string;
  location?: string;
  toDo?: ToDoEnt[];
  remarks?: string;


}

@ObjectType()
export class TicketEnt extends TicketEntCommon {
  comments: CommentEnt[];
  reactions: string[];
  works: WorkDetailEnt[];
  // works: string[];
  approvers: ApproverEnt[];
  createdBy?: UserEntAB;
  requestedBy?: UserEntAB;
  serviceDepartment?: DepartmentEnt;
  requestingDepartment?: DepartmentEnt;
  postOrigin?: PostEnt;
  assignedPersonnel?: AssignedPersonnelEnt[];
  attachments?:  AttachmentInptObj[];
  typeId?: TicketTypeEnt;
  asset?: AssetEnt;
  clientFeedback?: ClientFeedbackEnt;
}

@InputType('TicketInputType', { isAbstract: true })
@ObjectType()
export class TicketInput extends TicketEntCommon {
  comments?: string;
  reactions?: string;
  works?: string;
  approvers?: ApproverEntInput[];
  assignedPersonnel?: AssignedPersonnelEntInput[];
  postOrigin?: string;
  attachments?:  AttachmentInptObj[];
  createdBy?: string;
  requestedBy?: string;
  serviceDepartment?: string;
  requestingDepartment?: string;
  typeId?: string;
  asset?: string;
  isOverride?: boolean;
  clientFeedback?: ClientFeedbackInputEnt;
}

@ObjectType()
export class TicketCounterEnt extends CoreEntityMg {
  forApproval?: number;
  worksReceived?: number;
  myApproved?: SpecTicketCounterEnt;
  myAssigned?: SpecTicketCounterEnt;
  myCreatedTickets?: SpecTicketCounterEnt;
  deptServTickets?: SpecTicketCounterEnt;
  deptTicketRequest?: SpecTicketCounterEnt;
  markedReceivedWorks?: SpecTicketCounterEnt;
  moreCount?: number;
  allTickets?: SpecTicketCounterEnt;
  
}

@ObjectType()
export class SpecTicketCounterEnt {
  new?: number;
  all?: number;
}

// @InputType('TicketInputType', { isAbstract: true })
// @ObjectType()
// export class TicketEnt extends CoreEntityMg {
//   code: string;
//   description: string;
//   type: string;
//   dateNeeded: string;
//   dateRequested: string;
//   subject: string;
//   status: string;
//   location: string;
//   createdBy: UserEntAB;
//   requestedBy: UserEntAB;
//   serviceDepartment: DepartmentEnt;
//   requestingDepartment: DepartmentEnt;
//   comments: CommentEnt[];
//   reactions: string[];
//   postOrigin: PostEnt;
//   works: string[];
//   approvers: ApproverEnt[];
//   attachments: AttachmentEnt[];
// }
