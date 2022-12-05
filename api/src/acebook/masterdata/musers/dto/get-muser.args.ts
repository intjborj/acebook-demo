import { ArgsType, ObjectType } from '@nestjs/graphql';

import { PaginationArgs } from '@/common/dto/pagination.args';

import { PaginatorInfo } from '@/common/dto/paginator-info.model';
import { MuserEnt } from '../entities/muser.entity';

@ObjectType()
export class MuserPaginator {
  data: MuserEnt[];
  paginatorInfo: PaginatorInfo;
}

@ArgsType()
export class GetMusersArgs extends PaginationArgs {
  username?: string;
}
