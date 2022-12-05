import { ArgsType, ObjectType } from '@nestjs/graphql';

import { PaginationArgs } from '@/common/dto/pagination.args';

import { PaginatorInfo } from '@/common/dto/paginator-info.model';
import { AttachmentEnt, AttachmentInptObj } from '../entities/attachment.entity';

@ObjectType()
export class AttachmentPaginator {
  data: AttachmentEnt[];
  paginatorInfo: PaginatorInfo;
}



@ArgsType()
export class MultiAttachmentArgs {
  attachments?: AttachmentInptObj[];
  user?: string;
}


// @ArgsType()
// export class GetMusersArgs extends PaginationArgs {
//   username?: string;
// }
