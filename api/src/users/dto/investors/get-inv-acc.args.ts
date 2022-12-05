import { InvestorDetailsInput, InvestorDetMigrateInput, UserEntAB } from '@/users/entities/user.entity';
import {
  InputType,
  ObjectType,
    ArgsType
} from '@nestjs/graphql';



@ArgsType()
export class VerifyInvEmailArg {
  id?: string;
  investorId?: string;
  email?: string;
  emailCode?: string;
}




@ObjectType()
export class SpecAccount {
  data: UserEntAB;
}



