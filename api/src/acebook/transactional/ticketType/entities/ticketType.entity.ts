import { MuserEnt } from '@/acebook/masterdata/musers/entities/muser.entity';
import { UserEntAB } from '@/users/entities/user.entity';
import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { CoreEntity, CoreEntityMg } from '@/common/entities/core.entity';
import { DepartmentEnt } from '@/acebook/masterdata/department/entities/department.entity';

@ObjectType()
export class TicketTypeCommon extends CoreEntityMg {
  name?: string;
  code?: string;
  addWorkWOAssignedP?: boolean;
  addWorkWOApprovers?: boolean;
  isDisabled?: boolean;
}

@ObjectType()
export class TicketTypeEnt extends TicketTypeCommon {
  approvers?: UserEntAB[];
  assignments?: UserEntAB[];
  submissionDepartment?: DepartmentEnt[];
  serviceDepartment?: DepartmentEnt[];
}


@InputType('TicketTypeInputType', { isAbstract: true })
@ObjectType()
export class TicketTypeEntInput extends TicketTypeCommon {
  approvers?: string[];
  assignments?: string[];
  submissionDepartment?: string[];
  serviceDepartment?: string;
}
