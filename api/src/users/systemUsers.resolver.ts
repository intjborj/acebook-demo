import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { User, UserEntAB } from './entities/user.entity';
import { InvestorUsersService } from './services/investorsAcc.service';
import {
  UserRegResponseMU
} from './dto/create-user.input';
import { InvestorMigrationInput } from './dto/investors/investorsAcc.input';
import { AccountPaginator } from './dto/get-users.args';
import { SystemUsersService } from './services/systemUsers.service';
import { GetUserAccrArgs } from './dto/get-user.args';

@Resolver(() => User)
export class SystemUsersResolver {
  constructor(private readonly sysUsersService: SystemUsersService) { }


  @Mutation(() => UserEntAB)
  async deleteUser(
    @Args() deleteInput: GetUserAccrArgs,
  ): Promise<UserEntAB> {

    return this.sysUsersService.delete(deleteInput);
  }

}