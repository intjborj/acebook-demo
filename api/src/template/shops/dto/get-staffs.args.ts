import { ArgsType, Field, ID } from '@nestjs/graphql';
import { PaginationArgs } from '@/common/dto/pagination.args';

@ArgsType()
export class GetStaffsArgs extends PaginationArgs {
  orderBy?: string;
  sortedBy?: string;
  @Field(() => ID)
  shop_id?: number;
}
