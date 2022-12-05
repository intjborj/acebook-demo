import { ArgsType, ObjectType } from '@nestjs/graphql';

import { PaginationArgs } from '@/common/dto/pagination.args';

import { PaginatorInfo } from '@/common/dto/paginator-info.model';
import { BodPollCandidateEnt } from '../entities/bodPollCandidate.entity';

@ObjectType()
export class BodPollCandidatePaginator {
  data: BodPollCandidateEnt[];
  paginatorInfo: PaginatorInfo;
}



// @ArgsType()
// export class GetMusersArgs extends PaginationArgs {
//   username?: string;
// }
