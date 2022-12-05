import { UserEntAB } from '@/users/entities/user.entity';
import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { CoreEntityMg } from '@/common/entities/core.entity';
import { ReactionIconDetailEnt } from '../masterdata/reactionIconDetails/entities/reactionIconDetail.entity';


@ObjectType()
export class AssignedPersonnelEntCommon extends CoreEntityMg {
  // received?: string;
  receivedAt?: string;
}

@ObjectType()
export class AssignedPersonnelEnt extends AssignedPersonnelEntCommon {
  user?: UserEntAB;
}


@InputType('AssignedPersonnelInputType', { isAbstract: true })
@ObjectType()
export class AssignedPersonnelEntInput extends AssignedPersonnelEntCommon {
  user?: string;
  receivedAt?: string;
}


