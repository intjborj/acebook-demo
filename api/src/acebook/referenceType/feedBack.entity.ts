import { UserEntAB } from '@/users/entities/user.entity';
import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { CoreEntityMg } from '@/common/entities/core.entity';
import { ReactionIconDetailEnt } from '../masterdata/reactionIconDetails/entities/reactionIconDetail.entity';


@InputType('ClientFeedbackCommonType', { isAbstract: true })
@ObjectType()
export class ClientFeedbackCommon extends CoreEntityMg {
  message?: string;
  updatedAt?: string;
}

// @ObjectType()
// export class ApproverEnt extends ApproverEntCommon {
//   user?: UserEntAB;
// }


@InputType('ClientFeedbackType', { isAbstract: true })
@ObjectType()
export class ClientFeedbackEnt extends ClientFeedbackCommon {
  reactionIcon?: ReactionIconDetailEnt;

}


@InputType('ClientFeedbackInputType', { isAbstract: true })
@ObjectType()
export class ClientFeedbackInputEnt extends ClientFeedbackCommon {

  reactionIcon?: string;
}


