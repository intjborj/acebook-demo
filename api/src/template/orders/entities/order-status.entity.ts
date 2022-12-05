import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { CoreEntity } from '@/common/entities/core.entity';

@InputType('OrderStatusInputType', { isAbstract: true })
@ObjectType()
export class OrderStatus extends CoreEntity {
  name: string;
  color: string;
  @Field(() => Int)
  serial: number;
}
