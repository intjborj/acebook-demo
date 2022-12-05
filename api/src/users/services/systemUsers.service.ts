import { Injectable } from '@nestjs/common';
import {
    AuthResponse,
    RegisterInput,
  } from '../dto/create-user.input';
import {  InvestorDetailsContainer, InvestorMigrationInput } from '../dto/investors/investorsAcc.input';
import MUser from '@models/User';
import { InvestorDetailsInput, UserEntAB } from '../entities/user.entity';
import { AccountPaginator } from '../dto/get-users.args';
import { GetUserAccrArgs } from '../dto/get-user.args';

@Injectable()
export class SystemUsersService {

  async delete(upsertInput: GetUserAccrArgs): Promise<UserEntAB> {
    let removedData = await MUser.findOneAndDelete({
      _id: upsertInput.id,
    });

    return removedData;
  }
   
}