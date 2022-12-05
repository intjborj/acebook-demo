import { UserEntAB } from '@/users/entities/user.entity';
import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { CoreEntityMg } from '@/common/entities/core.entity';
import { ReactionIconDetailEnt } from '../masterdata/reactionIconDetails/entities/reactionIconDetail.entity';


@ObjectType()
export class ApproverEntCommon extends CoreEntityMg {
  status?: string;
  updatedAt?: string;
}

@ObjectType()
export class ApproverEnt extends ApproverEntCommon {
  user?: UserEntAB;
}


@InputType('ApproverInputType', { isAbstract: true })
@ObjectType()
export class ApproverEntInput extends ApproverEntCommon {
  user: string;
  status?: string;
  updatedAt?: string;
}


