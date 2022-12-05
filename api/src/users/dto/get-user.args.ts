import { ArgsType, Field, ID , ObjectType} from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { UserEntAB } from '../entities/user.entity';

@ArgsType()
export class GetUserArgs {
  @IsNotEmpty()
  @Field(() => ID)
  id: number;
}


@ArgsType()
export class GetUserAccrArgs {
  @IsNotEmpty()
  @Field(() => ID)
  id: string;
}



@ObjectType()
export class SpecAccount {
  data: UserEntAB;
}
