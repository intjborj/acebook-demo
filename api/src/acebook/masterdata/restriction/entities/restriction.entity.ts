import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { CoreEntity, CoreEntityMg } from '@/common/entities/core.entity';

@InputType('RestrictionInputType', { isAbstract: true })
@ObjectType()
export class RestrictionEnt extends CoreEntityMg {
  code?: string;
  path?: string;
  type?: string;
  description?: string;
}
