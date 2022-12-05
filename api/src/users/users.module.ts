import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { InvestorUsersResolver } from './investorUsers.resolver';
import { InvestorUsersService } from './services/investorsAcc.service';
import { SystemUsersService } from './services/systemUsers.service';
import { SystemUsersResolver } from './systemUsers.resolver';

@Module({
  providers: [UsersResolver, UsersService, InvestorUsersResolver, InvestorUsersService, SystemUsersService, SystemUsersResolver],
  // providers: [UsersResolver, UsersService, InvestorUsersResolver, InvestorUsersService, SystemUsersService, SystemUsersResolver],
})
export class UsersModule {}
