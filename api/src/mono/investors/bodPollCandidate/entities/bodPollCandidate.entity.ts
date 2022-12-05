import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { CoreEntity, CoreEntityMg } from '@/common/entities/core.entity';

@InputType('BodPollCandidateInputType', { isAbstract: true })
@ObjectType()
export class BodPollCandidateEnt extends CoreEntityMg {
  name: string;
  description: string;
}
