import { ArgsType, ObjectType } from '@nestjs/graphql';

import { PaginationArgs } from '@/common/dto/pagination.args';

import { PaginatorInfo } from '@/common/dto/paginator-info.model';
import { PromotionEnt } from '../entities/promotion.entity';

@ObjectType()
export class PromotionPaginator {
  data: PromotionEnt[];
  paginatorInfo?: PaginatorInfo;
}



// @ArgsType()
// export class GetMusersArgs extends PaginationArgs {
//   username?: string;
// }
