import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { CoreEntity, CoreEntityMg } from '@/common/entities/core.entity';

@InputType('reactionIconDetailInputType', { isAbstract: true })
@ObjectType()
export class ReactionIconDetailEnt extends CoreEntityMg {
  name: string;
  path: string;
}
