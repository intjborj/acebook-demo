import {
  ArgsType,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { SortOrder } from '@/common/dto/generic-conditions.input';
import { PaginationArgs } from '@/common/dto/pagination.args';
import { PaginatorInfo } from '@/common/dto/paginator-info.model';
import { User, UserEntAB } from '../entities/user.entity';

@ObjectType()
export class UserPaginator {
  data: User[];
  paginatorInfo: PaginatorInfo;
}

@ArgsType()
export class GetUsersArgs extends PaginationArgs {
  orderBy?: QueryUsersOrderByOrderByClause[];
  text?: string;
}

@InputType('AccSearchType', { isAbstract: true })
@ObjectType()
export class AccSearchType {
  isSearch?: boolean;
  department?: string;
}

@ArgsType()
export class GetAccArgs extends PaginationArgs {
  orderBy?: QueryUsersOrderByOrderByClause[];
  text?: string;
  id?: string;
  department?: string;
  name?: string;
  type?:string;
  searchArg?: AccSearchType
}

@InputType()
export class QueryUsersOrderByOrderByClause {
  column: QueryUsersOrderByColumn;
  order: SortOrder;
}
export enum QueryUsersOrderByColumn {
  CREATED_AT = 'CREATED_AT',
  NAME = 'NAME',
  UPDATED_AT = 'UPDATED_AT',
}

registerEnumType(QueryUsersOrderByColumn, {
  name: 'QueryUsersOrderByColumn',
});

@ObjectType()
export class AccountPaginator {
  data: UserEntAB[];
  paginatorInfo: PaginatorInfo;
}



@ObjectType()
export class AccountData {
  data: UserEntAB;
}
