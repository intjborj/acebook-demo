import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { CoreEntity, CoreEntityMg } from '@/common/entities/core.entity';

@InputType('AssManufacturerInputType', { isAbstract: true })
@ObjectType()
export class ManufacturerEnt extends CoreEntityMg {
  name?: string;
  mobile?: string;
  migrationId?: string;
  email?: string;
  url?: string;
  information?: string;
}
