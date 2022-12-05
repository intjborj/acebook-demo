import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { CoreEntity } from '@/common/entities/core.entity';
@InputType('ShippingInputType', { isAbstract: true })
@ObjectType()
export class Shipping extends CoreEntity {
  name: string;
  amount: number;
  @Field(() => Boolean, { defaultValue: true })
  is_global = true;
  type: ShippingType;
}

export enum ShippingType {
  FIXED = 'fixed',
  PERCENTAGE = 'percentage',
  FREE = 'free',
}

registerEnumType(ShippingType, {
  name: 'ShippingType',
});
