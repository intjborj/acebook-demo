import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class PaginationArgs {
  @Field(() => Int)
  first?: number = 15;
  @Field(() => Int)
  page?: number = 1;
  @Field(() => Int)
  skip?: number = 0;
  @Field(() => Int)
  perPage?: number = 10;
}

@ArgsType()
export class SpecObjectArgs {
  @Field(() => String)
  id?: string ;
 @Field(() => String)
  department?: string ;
 @Field(() => String)
  type?: string ;
}
