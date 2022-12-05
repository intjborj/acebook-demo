import { ArgsType, ObjectType, InputType } from '@nestjs/graphql';

import { PaginationArgs } from '@/common/dto/pagination.args';

import { PaginatorInfo } from '@/common/dto/paginator-info.model';
import { TicketCounterEnt, TicketEnt } from '../entities/ticket.entity';
import { TicketTypeEnt } from '../../ticketType/entities/ticketType.entity';
import { GenSearchType } from '@/common/dto/search.args';

@ObjectType()
export class TicketPaginator {
  data: TicketEnt[];
  paginatorInfo: PaginatorInfo;
}

@ObjectType()
export class TicketData {
  data?: TicketEnt;
  ticketTypeData?: TicketTypeEnt
}

@ObjectType()
export class TicketCounterResp {
  data: TicketCounterEnt;
  paginatorInfo: PaginatorInfo;
}

@InputType('TicketSearchType', { isAbstract: true })
@ObjectType()
export class TicketSearchType {
  isSearch?: boolean;
  description?:string;
  dateType?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
  ticketType ?: string;
}
// export class TicketSearchType extends GenSearchType {
//   genType?: string
// }

// export class TicketSearchType {
//   isSearch?: boolean;
//   description?:string;
//   dateType?: string;
//   startDate?: string;
//   endDate?: string;
//   status?: string;
//   ticketType ?: string;
// }



@ArgsType()
export class TicketPaginatorArg extends PaginationArgs {
  _id?: string;
  workId?: string;
  type?: string;
  userId?: string;
  departmentId?: string;
  searchArg?: TicketSearchType
}


@ArgsType()
export class ReceivingArg  {
  _id?: string;
  userId?: string;
}

// @ArgsType()
// export class GetMusersArgs extends PaginationArgs {
//   username?: string;
// }
