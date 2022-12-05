import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { CoreEntity, CoreEntityMg } from '@/common/entities/core.entity';

@InputType('FbCategoryType', { isAbstract: true })
@ObjectType()
export class FbCategoryEnt extends CoreEntityMg {
  name: string;
  description: string;
  icon?: string;
  color?: string;
  _id:string
}


@InputType('FbCategoryInputType', { isAbstract: true })
@ObjectType()
export class FbCategoryInpt  {
  name: string;
  description: string;
  icon?: string;
  color?: string;
  _id?:string
}
