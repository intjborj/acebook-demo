import { UserEntAB } from '@/users/entities/user.entity';
import { ArgsType, ObjectType } from '@nestjs/graphql';

import { PaginationArgs } from '@/common/dto/pagination.args';

import { PaginatorInfo } from '@/common/dto/paginator-info.model';
import { PollDetailsEnt, PollDetailsEntView } from '../entities/pollDetails.entity';

@ObjectType()
export class PollDetailsPaginator {
  data: PollDetailsEntView[];
  paginatorInfo: PaginatorInfo;
}


@ArgsType()
export class PollPaginatorArg extends PaginationArgs {
  _id?: string;
}


@ArgsType()
export class VoteResultArg {
  _id?: string;
}

@ObjectType()
export class VoteResultReturn {
  data: PollResults[]
}


@ObjectType()
export class PollResults {
  _id?: string;
  user?:UserEntAB;
  totalVotes?: number;
  thumbnail?: string;
}


@ObjectType()
export class TotalVotes {
  totalVotes?: number;
}

// @ArgsType()
// export class GetMusersArgs extends PaginationArgs {
//   username?: string;
// }
