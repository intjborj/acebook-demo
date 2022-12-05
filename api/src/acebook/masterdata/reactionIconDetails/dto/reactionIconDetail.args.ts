import { ArgsType, ObjectType } from '@nestjs/graphql';

import { PaginationArgs } from '@/common/dto/pagination.args';

import { PaginatorInfo } from '@/common/dto/paginator-info.model';
import { ReactionIconDetailEnt } from '../entities/reactionIconDetail.entity';

@ObjectType()
export class ReactionIconDetailPaginator {
  data: ReactionIconDetailEnt[];
  paginatorInfo: PaginatorInfo;
}



// @ArgsType()
// export class GetMusersArgs extends PaginationArgs {
//   username?: string;
// }
