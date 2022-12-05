import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { CoreEntity, CoreEntityMg } from '@/common/entities/core.entity';

@InputType('PromotionEntType', { isAbstract: true })
@ObjectType()
export class PromotionEnt extends CoreEntityMg {
  path?: string;
  type?: string;
}



@InputType('PromotionInputType', { isAbstract: true })
@ObjectType()
export class PromotionEntInput extends CoreEntityMg {
  paths?: PromotionEnt[];
}
