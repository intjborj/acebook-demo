import { ArgsType, ObjectType } from '@nestjs/graphql';

import { PaginationArgs } from '@/common/dto/pagination.args';

import { PaginatorInfo } from '@/common/dto/paginator-info.model';
import { PostEnt } from '../entities/post.entity';
import { CommentEnt } from '../../comment/entities/comment.entity';
import { TicketSearchType } from '../../ticket/dto/ticket.args';

@ObjectType()
export class PostPaginator {
  data: PostEnt[];
  paginatorInfo: PaginatorInfo;
}


@ObjectType()
export class PostData {
  data: PostEnt;
}

@ArgsType()
export class PostPaginatorArg extends PaginationArgs {
  departmentId?: string;
  type?: string;
  privacy?: boolean;
  user?: string;
  _id?: string;
  searchArg?: TicketSearchType
}





// @ArgsType()
// export class GetMusersArgs extends PaginationArgs {
//   username?: string;
// }
