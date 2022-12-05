import { ArgsType, ObjectType } from '@nestjs/graphql';

import { PaginationArgs } from '@/common/dto/pagination.args';

import { PaginatorInfo } from '@/common/dto/paginator-info.model';
import { DepartmentEnt } from '../entities/department.entity';
import { GenSearchType } from '@/common/dto/search.args';

@ObjectType()
export class DepartmentPaginator {
  data: DepartmentEnt[];
  paginatorInfo: PaginatorInfo;
}


@ObjectType()
export class DepartmentData {
  data: DepartmentEnt;
}



@ArgsType()
export class DeptPaginatorArg extends PaginationArgs {
  _id?: string;
  workId?: string;
  type?: string;
  userId?: string;
  departmentId?: string;
  searchArg?: GenSearchType
}



// @ArgsType()
// export class GetMusersArgs extends PaginationArgs {
//   username?: string;
// }
