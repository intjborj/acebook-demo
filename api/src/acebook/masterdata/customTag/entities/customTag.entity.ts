import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { CoreEntity, CoreEntityMg } from '@/common/entities/core.entity';

@InputType('CustomTagInputType', { isAbstract: true })
@ObjectType()
export class CustomTagEnt extends CoreEntityMg {
  name?: string;
  code?: string;
  description?: string;
}
