import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UsersService } from './users.service';
import MUser from '@models/User';
import { User } from './entities/user.entity';
import {
  AuthResponse,
  ChangePasswordInput,
  ForgetPasswordInput,
  LoginInput,
  OtpInput,
  OtpLoginInput,
  OtpResponse,
  PasswordChangeResponse,
  RegisterInput,
  RegisterInputMU,
  ResetPasswordInput,
  SocialLoginInput,
  UserRegResponseMU,
  VerifyForgetPasswordTokenInput,
  VerifyOtpInput,
} from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { GetUserArgs } from './dto/get-user.args';
import { AccountData, AccountPaginator, GetAccArgs, GetUsersArgs, UserPaginator } from './dto/get-users.args';
import { SuccessResponse } from '@/common/dto/success-response.model';
import { ProfileInput } from './dto/create-profile.input';
import { Profile } from './entities/profile.entity';
import { UpdateProfileArgs } from './dto/update-profile.args';
import { MakeOrRevokeAdminInput } from './dto/make-revoke-admin.input';
import bcrypt from 'bcryptjs';
import { PaginationArgs } from '@/common/dto/pagination.args';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) { }

  // @Mutation(() => UserRegResponse)
  // async register(
  //   @Args('input') upsertInput: RegisterInput,
  // ): Promise<UserRegResponse> {
  //   if(upsertInput._id){
  //     return this.usersService.updateMUser(upsertInput);
  //   }else{
  //     return this.usersService.register(upsertInput);
  //   }

  // }

  @Mutation(() => AuthResponse)
  async register(
    @Args('input') createUserInput: RegisterInput,
  ): Promise<AuthResponse> {


    return this.usersService.register(createUserInput);
  }


  @Mutation(() => UserRegResponseMU)
  async registerMU(
    @Args('input') upsertInput: RegisterInputMU,
  ): Promise<UserRegResponseMU> {
    if (upsertInput._id) {
      return this.usersService.updateMUser(upsertInput);
    } else {
      return this.usersService.registerMU(upsertInput);
    }

  }

  @Mutation(() => AuthResponse)
  async login(@Args('input') loginInput: LoginInput): Promise<AuthResponse> {
    return this.usersService.login(loginInput);
  }

  @Mutation(() => AuthResponse)
  async socialLogin(
    @Args('input') socialLoginInput: SocialLoginInput,
  ): Promise<AuthResponse> {
    console.log("socialLoginInput", socialLoginInput);
    return {
      token: 'jwt token',
      permissions: ['super_admin', 'customer'],
    };
  }

  @Mutation(() => AuthResponse)
  async otpLogin(
    @Args('input') otpLoginInput: OtpLoginInput,
  ): Promise<AuthResponse> {
    console.log(otpLoginInput);
    return {
      token: 'jwt token',
      permissions: ['super_admin', 'customer'],
    };
  }

  @Mutation(() => SuccessResponse)
  async verifyOtpCode(
    @Args('input') verifyOtpInput: VerifyOtpInput,
  ): Promise<SuccessResponse> {
    console.log(verifyOtpInput);
    return {
      message: 'success',
      success: true,
    };
  }

  @Mutation(() => OtpResponse)
  async sendOtpCode(@Args('input') otpInput: OtpInput): Promise<OtpResponse> {
    console.log(otpInput);
    return {
      message: 'success',
      success: true,
      id: '1',
      provider: 'google',
      phone_number: '+919494949494',
      is_contact_exist: true,
    };
  }

  @Mutation(() => Boolean)
  async logout(): Promise<boolean> {
    return true;
  }

  @Mutation(() => PasswordChangeResponse)
  async changePassword(
    @Args('input') changePasswordInput: ChangePasswordInput,
  ): Promise<PasswordChangeResponse> {
    return this.usersService.changePassword(changePasswordInput);
  }

  @Mutation(() => PasswordChangeResponse)
  async forgetPassword(
    @Args('input') forgetPasswordInput: ForgetPasswordInput,
  ): Promise<PasswordChangeResponse> {
    return this.usersService.forgetPassword(forgetPasswordInput);
  }

  @Mutation(() => PasswordChangeResponse)
  async verifyForgetPasswordToken(
    @Args('input')
    verifyForgetPasswordTokenInput: VerifyForgetPasswordTokenInput,
  ): Promise<PasswordChangeResponse> {
    return this.usersService.verifyForgetPasswordToken(
      verifyForgetPasswordTokenInput,
    );
  }

  @Mutation(() => PasswordChangeResponse)
  async resetPassword(
    @Args('input')
    resetPasswordInput: ResetPasswordInput,
  ): Promise<PasswordChangeResponse> {
    return this.usersService.resetPassword(resetPasswordInput);
  }

  @Query(() => UserPaginator, { name: 'users' })
  async getUsers(@Args() getUsersArgs: GetUsersArgs): Promise<UserPaginator> {
    return this.usersService.getUsers(getUsersArgs);
  }

  @Query(() => User, { name: 'me' })
  async me(): Promise<User> {
    return this.usersService.me();
  }

  @Query(() => User, { name: 'user', nullable: true })
  getUser(@Args() getUserArgs: GetUserArgs): User {
    return this.usersService.getUser(getUserArgs);
  }

  @Mutation(() => UserRegResponseMU)
  updateUser(@Args('input') updateUserInput: RegisterInputMU,
  ): Promise<UserRegResponseMU> {
    // updateUser(@Args('input') updateUserInput: UpdateUserInput) {


    return this.usersService.updateMUser(updateUserInput);
    // return this.usersService.updateUser(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  activeUser(@Args('id', { type: () => ID }) id: number) {
    console.log(id);
    // return this.usersService.getUsers(updateUserInput.id);
  }

  @Mutation(() => User)
  banUser(@Args('id', { type: () => ID }) id: number) {
    console.log(id);
    // return this.usersService.getUsers(updateUserInput.id);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => ID }) id: number) {
    return this.usersService.remove(id);
  }

  @Mutation(() => Profile)
  createProfile(@Args('input') profileInput: ProfileInput) {
    console.log(profileInput);
  }

  @Mutation(() => Profile)
  updateProfile(@Args() updateProfileArgs: UpdateProfileArgs) {
    console.log(updateProfileArgs);
  }

  @Mutation(() => Profile)
  deleteProfile(@Args('id', { type: () => ID }) id: number) {
    return this.usersService.remove(id);
  }

  @Mutation(() => Boolean)
  async makeOrRevokeAdmin(
    @Args('input') makeOrRevokeAdminInput: MakeOrRevokeAdminInput,
  ) {
    return this.usersService.makeOrRevokeAdmin(makeOrRevokeAdminInput);
  }

  @Mutation(() => Boolean)
  async subscribeToNewsletter(
    @Args('email', { type: () => String }) email: string,
  ) {
    return this.usersService.subscribeToNewsletter(email);
  }

  // CUSTOM //
  @Query(() => AccountData, { name: 'specAccount' })
  getOneUser(@Args() getArgs: GetAccArgs) {
    return this.usersService.findOneUser(getArgs);
  }

  @Query(() => AccountPaginator, { name: 'accounts' })
  getTags(@Args() getArgs: GetAccArgs) {
    return this.usersService.findAll(getArgs);
  }

  @Query(() => AccountPaginator, { name: 'search_accounts' })
  searchAcc(@Args() getArgs: GetAccArgs) {
    return this.usersService.searchUser(getArgs);
  }


}
