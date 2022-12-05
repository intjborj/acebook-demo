import { ObjectType, InputType, Field, ID } from '@nestjs/graphql';
import { DepartmentEnt } from 'src/acebook/masterdata/department/entities/department.entity';
import { Address } from '@/template/addresses/entities/address.entity';
import { CoreEntity, CoreEntityMg } from '@/common/entities/core.entity';
import { Order } from '@/template/orders/entities/order.entity';
import { Refund } from '@/template/refunds/entities/refund.entity';
import { Shop } from '@/template/shops/entities/shop.entity';
import { Wallet } from '@/template/wallets/entities/wallet.entity';
import { Profile } from './profile.entity';
import { RestrictionEnt } from '@/acebook/masterdata/restriction/entities/restriction.entity';
import { AccConfigEnt } from '@/acebook/masterdata/accountConfiguration/entities/accConfig.entity';

@InputType('UserInputType', { isAbstract: true })
// @InputType('UserInputType', { isAbstract: true })
@ObjectType()
export class User extends CoreEntity {
  name: string;
  email: string;
  username: string;
  password?: string;
  shop_id?: number;
  profile?: Profile;
  shops?: Shop[];
  refunds?: Refund[];
  managed_shop?: Shop;
  is_active?: boolean = true;
  address?: Address[];
  orders?: Order[];
  wallet?: Wallet;
  permissions: Permissions[];
 
}

// OFFICIAL USER GRAPHQL TYPE ACE-BOOK
@InputType('UserTypeAB', { isAbstract: true })
@ObjectType()
export class UserEntAB extends CoreEntityMg {
  // username: string;
  // email: string;
  // password: string;
  // role: string;
  // token: string;
  profilePicture?: string;
  suffix?: string;
  username?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  position?: string;
  isActive?: boolean;
  isApprover?: boolean;
  contact?: string;
  email?: string;
  password?: string;
  token?: string;
  departmentOnDuty?: DepartmentEnt ;
  department?: DepartmentEnt[] ;
  restrictionCode?: string[];
  restrictionCodeDetailed?: RestrictionEnt[];
  investorDetails? : InvestorDetailsInput;
  nameExtension?: string;
  verificationCode?: string;
  configurations?: AccConfigEnt;
}

@InputType('UserInputTypeAB', { isAbstract: true })
@ObjectType()
export class UserEntABInput extends CoreEntityMg {
  // username: string;
  // email: string;
  // password: string;
  // role: string;
  // token: string;
  profilePicture?: string;
  suffix?: string;
  username?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  position?: string;
  isActive?: boolean;
  isApprover?: boolean;
  contact?: string;
  email?: string;
  password?: string;
  token?: string;
  departmentOnDuty?: string ;
  department?: string[] ;
  restrictionCode?: string[];
  investorDetails? : InvestorDetailsInput
  nameExtension?: string;
}

@InputType('PermissionsInputType', { isAbstract: true })
@ObjectType()
export class Permissions {
  @Field(() => ID)
  id: number;
  name: string;
}


@InputType('investorsDetInputType', { isAbstract: true })
@ObjectType()
export class InvestorDetailsInput  {
  isEmployee?: boolean;
  blocks?: number;
  investorId?: string;
  votingHistory?: string[]
}


@InputType('investorsInputTypeMigrate', { isAbstract: true })
@ObjectType()
export class InvestorDetMigrateInput  {
  isEmployee?: boolean;
  blocks?: string;
  investorId?: string;
  votingHistory?: string[]
}

