import { DepartmentEnt } from '@/acebook/masterdata/department/entities/department.entity';
import { ApproverEnt, ApproverEntInput } from '@/acebook/referenceType/approver.entity';
import { UserEntAB } from '@/users/entities/user.entity';
import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';

@ObjectType()
export class QueryEnt {
  noop: Boolean
}

@ObjectType()
export class MutationEnt {
  ping: PingEnt
}

@ObjectType()
export class SubscriptionEnt {
  pong: PongEnt
}

@ObjectType()
export class PingEnt  {

  id: string
}
@ObjectType()
export class PongEnt  {

  pingId: string
}

@InputType('pingInputType', { isAbstract: true })
@ObjectType()
export class PingInputEnt {
  repoFullName?: string
}
