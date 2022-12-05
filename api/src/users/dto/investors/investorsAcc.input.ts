import { InvestorDetailsInput, InvestorDetMigrateInput } from '@/users/entities/user.entity';
import {
    InputType
  } from '@nestjs/graphql';


@InputType()
export class InvestorMigrationInput {
  multiInvetsor: InvestorDetMigrateInput[];
}

// @InputType()
// export class InvestorMigrationInput {
//   multiInvetsor: InvestorDetailsContainer[];
// }


@InputType()
export class InvestorDetailsContainer {
  investorDetails: InvestorDetailsInput;
}