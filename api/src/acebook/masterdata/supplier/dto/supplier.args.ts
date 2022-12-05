import { ArgsType, ObjectType, InputType } from '@nestjs/graphql';

import { PaginationArgs } from '@/common/dto/pagination.args';

import { PaginatorInfo } from '@/common/dto/paginator-info.model';
import { SupplierEnt } from '../entities/supplier.entity';

@ObjectType()
export class AssSupplierPaginator {
  data: SupplierEnt[];
  paginatorInfo: PaginatorInfo;
}


@ObjectType()
export class AssSupplierData {
  data: SupplierEnt;
}

@InputType('BulkSupplierInputType', { isAbstract: true })
@ObjectType()
export class BulkSupplierData {
  suppliers: SupplierEnt[];
}



// @ArgsType()
// export class GetMusersArgs extends PaginationArgs {
//   username?: string;
// }
