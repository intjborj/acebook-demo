import { ArgsType, ObjectType } from '@nestjs/graphql';
import { PaginationArgs } from '@/common/dto/pagination.args';
import { PaginatorInfo } from '@/common/dto/paginator-info.model';
import { Shop } from '../entities/shop.entity';

@ObjectType()
export class ShopPaginator {
  data: Shop[];
  paginatorInfo: PaginatorInfo;
}

@ArgsType()
export class GetShopsArgs extends PaginationArgs {
  orderBy?: string;
  text?: string;
  sortedBy?: string;
  is_active?: boolean;
}
