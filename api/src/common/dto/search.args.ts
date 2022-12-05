import { ArgsType, ObjectType, InputType } from '@nestjs/graphql';
@InputType('GenSearchType', { isAbstract: true })
@ObjectType()
export class GenSearchType {
  isSearch?: boolean;
  description?:string;
  dateType?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
  ticketType ?: string;
}


