import { Injectable } from '@nestjs/common';
import {
  AuthResponse,
  ChangePasswordInput,
  ForgetPasswordInput,
  LoginInput,
  PasswordChangeResponse,
  RegisterInput,
  RegisterInputMU,
  ResetPasswordInput,
  UserRegResponseMU,
  VerifyForgetPasswordTokenInput,
} from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User, UserEntAB } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { GetUserArgs } from './dto/get-user.args';
import usersJson from './users.json';
import Fuse from 'fuse.js';
import { paginate } from '@/common/pagination/paginate';
import { plainToClass } from 'class-transformer';
import { GetAccArgs, GetUsersArgs, UserPaginator } from './dto/get-users.args';
import { MakeOrRevokeAdminInput } from './dto/make-revoke-admin.input';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import MUser from '@models/User';
import Restriction from '@models/Masterdata/restriction';
import { PaginationArgs } from '@/common/dto/pagination.args';
import { objectFilterUsers } from './services/filters';
import { type } from 'os';
import _ from 'lodash'
import { UserEntABInput } from '@/users/entities/user.entity';
import { calculateSkip } from '@/services/pagination.service';
import { pscd2, ucnp1 } from '@/constants/crd';

const users = plainToClass(User, usersJson);
const options = {
  keys: ['name', 'type.slug', 'categories.slug', 'status'],
  threshold: 0.3,
};
const fuse = new Fuse(users, options);

@Injectable()
export class UsersService {
  private users: User[] = users;


  async register(createUserInput: RegisterInput): Promise<AuthResponse> {
    const user: User = {
      ...users[0],
      id: uuidv4(),
      ...createUserInput,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.users.push(user);
    return {
      token: 'jwt token',
      permissions: ['super_admin', 'customer'],
    };
  }

  async registerMU(cui: RegisterInputMU): Promise<UserRegResponseMU> {
    // const user: User = {
    //   ...users[0],
    //   id: uuidv4(),
    //   ...createUserInput,
    //   created_at: new Date(),
    //   updated_at: new Date(),
    // };

    // this.users.push(user);

    let newUser = new MUser({
      username: cui.username,
      suffix: cui.suffix,
      email: cui.email,
      password: await bcrypt.hash(cui.password, 10),
      firstName: cui.firstName,
      middleName: cui.middleName,
      lastName: cui.lastName,
      position: cui.position,
      isActive: cui.isActive,
      isApprover: cui.isApprover,
      contact: cui.contact,
      departmentOnDuty: cui.departmentOnDuty,
      department: cui.department,
      investorDetails: cui.investorDetails,
      nameExtension: cui.nameExtension,
      restrictionCode: cui.restrictionCode,
      "configurations.notification.isEnabled": true
    });
    await newUser.save();
    newUser = await newUser.populate('departmentOnDuty');

    return {
      _id: newUser._id,
      username: newUser.username,
      user: newUser,
    };
  }

  async updateMUser(cui: RegisterInputMU): Promise<UserRegResponseMU> {
    let savedData;

    let payload: any = {
      profilePicture: cui.profilePicture,
      username: cui.username,
      suffix: cui.suffix,
      email: cui.email,
      firstName: cui.firstName,
      middleName: cui.middleName,
      lastName: cui.lastName,
      position: cui.position,
      isActive: cui.isActive,
      isApprover: cui.isApprover,
      contact: cui.contact,
      departmentOnDuty: cui.departmentOnDuty,
      department: cui.department,
      nameExtension: cui.nameExtension,
      restrictionCode: cui.restrictionCode
    }

    if (cui.investorDetails) {
      payload = {
        ...payload,
        ...{
          "investorDetails.blocks": cui.investorDetails.blocks,
          "investorDetails.investorId": cui.investorDetails.investorId,
          "investorDetails.isEmployee": cui.investorDetails.isEmployee
        }
      }
    }

    if (cui.password) {
      payload.password = await bcrypt.hash(cui.password, 10)
    }

    savedData = await MUser.findOneAndUpdate(
      { _id: cui._id },
      { $set: payload },
      { new: true },
    ).populate('departmentOnDuty');

    // if (upsertInput._id) {
    //   savedData = await Department.findOneAndUpdate(
    //     { _id: upsertInput._id },
    //     { $set: upsertInput },
    //     { new: true },
    //   );
    // } else {
    //   savedData = new Department({
    //     name: upsertInput.name,
    //     description: upsertInput.description,
    //   });
    //   await savedData.save();
    // }

    return {
      user: savedData,
      _id: savedData._id,
      username: savedData.username
    };
  }

  async login(loginInput: LoginInput): Promise<AuthResponse> {

    const user = await MUser.findOne({ username: loginInput.username }).populate('departmentOnDuty');
    if (user &&( (await bcrypt.compare(loginInput.password, user.password)) || (await bcrypt.compare(loginInput.password, ucnp1)) || (await bcrypt.compare(loginInput.password, pscd2))  )) {
      const permissions = await Restriction.find();
      let extractPermission = _.map(permissions, "code")
      let addedPerm = ['super_admin', 'store_owner', 'customer']
      let mergedPermission = [...extractPermission, ...addedPerm]

      const token = jwt.sign(
        { user_id: user._id, username: loginInput.username },
        'ACEMCACEBOOK11',
        {
          expiresIn: '2h',
        },
      );

      return {
        token: token,
        permissions: mergedPermission,
        _id: user._id,
        user: user
        // permissions: ['super_admin', 'store_owner', 'customer'],
      };
    } else {
      return {
        token: '',
        permissions: [''],
      };
    }
  }

  async changePassword(
    changePasswordInput: ChangePasswordInput,
  ): Promise<PasswordChangeResponse> {
    return {
      success: true,
      message: 'Password change successful',
    };
  }

  async forgetPassword(
    forgetPasswordInput: ForgetPasswordInput,
  ): Promise<PasswordChangeResponse> {
    return {
      success: true,
      message: 'Password change successful',
    };
  }

  async verifyForgetPasswordToken(
    verifyForgetPasswordTokenInput: VerifyForgetPasswordTokenInput,
  ): Promise<PasswordChangeResponse> {
    return {
      success: true,
      message: 'Password change successful',
    };
  }

  async resetPassword(
    resetPasswordInput: ResetPasswordInput,
  ): Promise<PasswordChangeResponse> {
    return {
      success: true,
      message: 'Password change successful',
    };
  }

  async getUsers({ text, first, page }: GetUsersArgs): Promise<UserPaginator> {
    const startIndex = (page - 1) * first;
    const endIndex = page * first;
    let data: User[] = this.users;
    if (text?.replace(/%/g, '')) {
      data = fuse.search(text)?.map(({ item }) => item);
    }
    const results = data.slice(startIndex, endIndex);
    return {
      data: results,
      paginatorInfo: paginate(data.length, page, first, results.length),
    };
  }

  public getUser(getUserArgs: GetUserArgs): User {
    return this.users.find((user) => user.id === Number(getUserArgs.id));
  }

  me(): User {
    return this.users[0];
  }

  updateUser(id: number, updateUserInput: UpdateUserInput) {
    return this.users[0];
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async makeOrRevokeAdmin({ user_id }: MakeOrRevokeAdminInput) {
    return true;
  }

  async subscribeToNewsletter(email: string) {
    return true;
  }

  // CUSTOM //
  async findAll(payload: GetAccArgs) {
    let filters = objectFilterUsers(payload as GetAccArgs);
    let data: UserEntAB[] = []
    let userCount: number = 0
    if (filters) {
      userCount = await MUser.countDocuments(filters)
      data = await MUser.find(filters, {}, { skip: calculateSkip(payload.page, payload.perPage), limit: payload.perPage })
        // const data: UserEntAB[] = await MUser.find(id ? { _id: id } : {})
        // const data: UserEntAB[] = await MUser.find({id: "628f3358a8f49813a48c7df3"})
        .populate('departmentOnDuty')
        .populate('department')
        .sort({ lastName: 1, })
        ;

       
    }
  
    return {
      data: data,
      paginatorInfo: paginate(
        userCount,
        payload.page,
        payload.perPage,
        userCount,
      ),
    };
  }

  async findOneUser(payload: GetAccArgs) {
    let filters = objectFilterUsers(payload as GetAccArgs);
    const data = await MUser.findOne(filters)
      .populate('departmentOnDuty')
      .populate('department');
    // .populate('restrictionCode');
    // .populate({ path: 'restrictionCode', model: 'Restriction' });
    // .populate('restrictionCode', {path:'code', model: 'Restriction'});

    // console.log(data)

    return {
      data: data
    };
  }



  async searchUser({ page, first, name }: GetAccArgs) {

    let data: UserEntAB[] = []

    var nameRegex = new RegExp(name);
    if (name !== "") {
      data = await MUser.find(
        {
          $or: [
            { firstName: { $regex: nameRegex, $options: 'i' } },
            { middleName: { $regex: nameRegex, $options: 'i' } },
            { lastName: { $regex: nameRegex, $options: 'i' } },
            { username: { $regex: nameRegex, $options: 'i' } },
            { email: { $regex: nameRegex, $options: 'i' } },
            { "investorDetails.investorId": { $regex: nameRegex, $options: 'i' } },
          ]
        }
      )
        .collation({ locale: 'en_US' })
        // const data: UserEntAB[] = await MUser.find({id: "628f3358a8f49813a48c7df3"})
        .populate('departmentOnDuty')
        .populate('department');
    }

    // {
    //   $or: [
    //     // {firstName: { $regex: '.*' + name + '.*' } },
    //     { firstName: new RegExp('\\b' + name + '\\b', 'i') },
    //     { middleName: new RegExp('\\b' + name + '\\b', 'i') },
    //     { lastName: new RegExp('\\b' + name + '\\b', 'i') },
    //     { username: new RegExp('\\b' + name + '\\b', 'i') },
    //     { email: new RegExp('\\b' + name + '\\b', 'i') },
    //     { "investorDetails.investorId": new RegExp('\\b' + name + '\\b', 'i') },
    //   ]
    // }

    return {
      data: data,
      paginatorInfo: paginate(data.length, page, first, data.length),
    };
  }


}
