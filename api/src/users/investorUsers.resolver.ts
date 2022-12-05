import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { InvestorUsersService } from './services/investorsAcc.service';
import {
  RegisterInputMU,
  UserRegResponseMU
} from './dto/create-user.input';
import { InvestorMigrationInput } from './dto/investors/investorsAcc.input';
import { AccountPaginator, GetAccArgs } from './dto/get-users.args';
import { GetUserAccrArgs, SpecAccount } from './dto/get-user.args';
import { VerifyInvEmailArg } from './dto/investors/get-inv-acc.args';
import { MailResponse, MailResponseData } from '@/util/mailer/dto/mail.args';

@Resolver(() => User)
export class InvestorUsersResolver {
  constructor(private readonly invUsersService: InvestorUsersService) { }


  @Mutation(() => UserRegResponseMU)
  async investorAccMigration(
    @Args('input') inputs: InvestorMigrationInput,
  ): Promise<AccountPaginator> {

    return this.invUsersService.insertInvestorIds(inputs);
  }

  @Mutation(() => UserRegResponseMU)
  async investorRegistration(
    @Args('input') inputs: RegisterInputMU,
  ): Promise<UserRegResponseMU> {

    return this.invUsersService.investorRegistration(inputs);
  }

  @Query(() => SpecAccount, { name: 'specificInvestor' })
  getSpecInvestor(@Args() getArgs: GetUserAccrArgs) {
    return this.invUsersService.findSpecInvestor(getArgs);
  }

  @Mutation(() => SpecAccount)
  checkSpecInvestor(@Args() getArgs: GetUserAccrArgs) {
    return this.invUsersService.findSpecInvestor(getArgs);
  }

  @Mutation(() => MailResponseData)
  verifyInvEmail(@Args() getArgs: VerifyInvEmailArg) {
    return this.invUsersService.verifyInvEmail(getArgs);
  }

  @Mutation(() => MailResponseData)
  verifyInvEmailCode(@Args() getArgs: VerifyInvEmailArg) {
    return this.invUsersService.verifyInvEmailCode(getArgs);
  }

  @Query(() => AccountPaginator, { name: 'search_investors' })
  searchInvestors(@Args() getArgs: GetAccArgs) {
    return this.invUsersService.searchInvestors(getArgs);
  }

}