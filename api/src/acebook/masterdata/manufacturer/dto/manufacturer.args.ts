import { ArgsType, ObjectType, InputType } from '@nestjs/graphql';

import { PaginationArgs } from '@/common/dto/pagination.args';

import { PaginatorInfo } from '@/common/dto/paginator-info.model';
import { ManufacturerEnt } from '../entities/manufacturer.entity';

@ObjectType()
export class AssManufacturerPaginator {
  data: ManufacturerEnt[];
  paginatorInfo: PaginatorInfo;
}


@ObjectType()
export class AssManufacturerData {
  data: ManufacturerEnt;
}

@InputType('BulkManufacturerInputType', { isAbstract: true })
@ObjectType()
export class BulkManufacturerData {
  manufacturers: ManufacturerEnt[];
}



// @ArgsType()
// export class GetMusersArgs extends PaginationArgs {
//   username?: string;
// }
