import { ArgsType, ObjectType } from '@nestjs/graphql';

import { PaginationArgs } from '@/common/dto/pagination.args';

import { PaginatorInfo } from '@/common/dto/paginator-info.model';
import { CommentEnt } from '../entities/comment.entity';

@ObjectType()
export class CommentPaginator {
  data: CommentEnt[];
  paginatorInfo: PaginatorInfo;
}

export class CommentResponse {
  status: string
}

@ArgsType()
export class CommentPaginatorArg extends PaginationArgs {
  postId?: string;
  userId?: string;
}



// @ArgsType()
// export class GetMusersArgs extends PaginationArgs {
//   username?: string;
// }
