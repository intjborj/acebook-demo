import { Address } from '@/template/addresses/entities/address.entity';
import {
  InputType,
  ObjectType,
  PartialType,
  PickType,
  registerEnumType,
} from '@nestjs/graphql';
import { Profile } from '../entities/profile.entity';
import { User, UserEntAB, UserEntABInput } from '../entities/user.entity';

enum Permission {
  SUPER_ADMIN = 'Super admin',
  STORE_OWNER = 'Store owner',
  STAFF = 'Staff',
  CUSTOMER = 'Customer',
}
registerEnumType(Permission, { name: 'Permission' });
@InputType()
export class RegisterInputMU extends PickType(UserEntABInput, [
// export class RegisterInput extends PickType(User, [
  '_id',
  'email',
  'password',
  'suffix',
  'username',
  'firstName',
  'middleName',
  'lastName',
  'position',
  'isActive',
  'isApprover',
  'contact',
  'token',
  'departmentOnDuty',
  'department',
  'restrictionCode',
  'profilePicture',
  'investorDetails',
  'nameExtension'
]) {
  permission: Permission = Permission.CUSTOMER;
}


registerEnumType(Permission, { name: 'Permission' });
@InputType()
export class RegisterInput extends PickType(User, [
  'name',
  'email',
  'password',
]) {
  permission: Permission = Permission.CUSTOMER;
}

@InputType()
export class LoginInput extends PartialType(
  PickType(User, ['username', 'password']),
) {}

@InputType()
export class SocialLoginInput {
  provider: string;
  access_token: string;
}
@InputType()
export class ChangePasswordInput {
  oldPassword: string;
  newPassword: string;
}
@InputType()
export class ForgetPasswordInput {
  email: string;
}
@InputType()
export class VerifyForgetPasswordTokenInput {
  email: string;
  token: string;
}
@InputType()
export class ResetPasswordInput {
  email: string;
  token: string;
  password: string;
}

@ObjectType()
export class AuthResponse {
  token: string;
  permissions: string[];
  _id?: string;
  user?: UserEntAB
}

// @ObjectType()
// export class UserRegResponse {
//   _id: string;
//   id?: string;
//   username: string;
// }

@ObjectType()
export class UserRegResponseMU {
  _id?: string;
  email?: string;
  username?: string;
  user?:UserEntAB;

  // Boilerpalte
  profile?: Profile;
  address?: Address[];
  name?: string;
  id?: string;
}

@ObjectType()
export class PasswordChangeResponse {
  success: boolean;
  message: string;
}
@InputType()
export class VerifyOtpInput {
  otp_id: string;
  code: string;
  phone_number: string;
}
@ObjectType()
export class OtpResponse {
  id: string;
  message: string;
  success: boolean;
  phone_number: string;
  provider: string;
  is_contact_exist: boolean;
}
@InputType()
export class OtpInput {
  phone_number: string;
}
@InputType()
export class OtpLoginInput {
  otp_id: string;
  code: string;
  phone_number: string;
  name?: string;
  email?: string;
}
