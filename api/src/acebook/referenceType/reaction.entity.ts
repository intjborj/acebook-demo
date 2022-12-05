import { UserEntAB } from '@/users/entities/user.entity';
import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { CoreEntityMg } from '@/common/entities/core.entity';
import { ReactionIconDetailEnt } from '../masterdata/reactionIconDetails/entities/reactionIconDetail.entity';

@InputType('ReactionType', { isAbstract: true })
@ObjectType()
export class ReactionEnt extends CoreEntityMg {
  reactionIcon: ReactionIconDetailEnt;
  user: UserEntAB;
}



// @InputType('ReactionInputType', { isAbstract: true })
@InputType('ReactionInputObjType', { isAbstract: true })
@ObjectType()
export class ReactionInputEnt {
  reactionIcon?: string;
  reactionName?: string;
  user?: string;
}
