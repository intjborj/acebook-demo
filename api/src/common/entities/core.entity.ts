import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Type } from 'class-transformer';

@ObjectType()
export class CoreEntity {
  @Field(() => ID)
  id: number;
  @Type(() => Date)
  created_at: Date;
  @Type(() => Date)
  updated_at: Date;
}



@ObjectType()
export class CoreEntityMg {
  @Field(() => ID,{ nullable: true })
  _id: String;
  @Type(() => Date)
  created_at?: Date;
  @Type(() => Date)
  updated_at?: Date;
}
