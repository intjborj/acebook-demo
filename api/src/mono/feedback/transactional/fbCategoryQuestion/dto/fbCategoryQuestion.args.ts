import { ArgsType, ObjectType } from '@nestjs/graphql';

import { PaginationArgs } from '@/common/dto/pagination.args';

import { PaginatorInfo } from '@/common/dto/paginator-info.model';
import { FbCategoryQuestionEnt } from '../entities/fbCategoryQuestion.entity';

@ObjectType()
export class FbCategoryQuestionPaginator {
  data: FbCategoryQuestionEnt[];
  paginatorInfo: PaginatorInfo;
}


@ArgsType()
export class FCQPaginatorArg extends PaginationArgs {
  _id?: string;
  categoryId?: string;
}



// @ArgsType()
// export class GetMusersArgs extends PaginationArgs {
//   username?: string;
// }
