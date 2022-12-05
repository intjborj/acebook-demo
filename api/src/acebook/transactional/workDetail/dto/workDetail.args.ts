import { ArgsType, ObjectType } from '@nestjs/graphql';

import { PaginationArgs } from '@/common/dto/pagination.args';

import { PaginatorInfo } from '@/common/dto/paginator-info.model';
import { WorkDetailEnt } from '../entities/workDetail.entity';

@ObjectType()
export class WorkDetailPaginator {
  data: WorkDetailEnt[];
  paginatorInfo: PaginatorInfo;
}

@ObjectType()
export class GetWorkDetail {
  data: WorkDetailEnt;
}



// @ArgsType()
// export class GetMusersArgs extends PaginationArgs {
//   username?: string;
// }
