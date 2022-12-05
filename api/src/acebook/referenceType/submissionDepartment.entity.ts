import { UserEntAB } from '@/users/entities/user.entity';
import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { CoreEntityMg } from '@/common/entities/core.entity';
import { ReactionIconDetailEnt } from '../masterdata/reactionIconDetails/entities/reactionIconDetail.entity';
import { DepartmentEnt } from '../masterdata/department/entities/department.entity';


@ObjectType()
export class SubmissionDeptEntCommon extends CoreEntityMg {
  status?: string;
  updatedAt?: string;
}

@ObjectType()
export class SubmissionDeptEnt extends SubmissionDeptEntCommon {
  department?: DepartmentEnt;
}


@InputType('SubmissionDeptInputType', { isAbstract: true })
@ObjectType()
export class SubmissionDeptEntInput extends SubmissionDeptEntCommon {
  department: string;
  status?: string;
  updatedAt?: string;
}


