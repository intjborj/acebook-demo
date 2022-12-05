import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { CoreEntity, CoreEntityMg } from '@/common/entities/core.entity';

@InputType('CompConfigInputType', { isAbstract: true })
@ObjectType()
export class CompConfigEnt extends CoreEntityMg {
  investor?: InvestorsConfigEntInput;
}


// @InputType('CompConfigEntInputType', { isAbstract: true })
// @ObjectType()
// export class CompConfigEntInput extends CoreEntityMg {
//   investors?: InvestorsConfigEntInput;
// }

@InputType('CompConfigInvestorsInputType', { isAbstract: true })
@ObjectType()
export class InvestorsConfigEntInput{
  sharesPerBlock?: number;
  votesPerShare?: number;
}

