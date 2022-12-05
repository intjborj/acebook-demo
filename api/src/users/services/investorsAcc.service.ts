import { Injectable } from '@nestjs/common';
import {
    AuthResponse,
    RegisterInput,
    RegisterInputMU,
    UserRegResponseMU,
} from '../dto/create-user.input';
import { InvestorDetailsContainer, InvestorMigrationInput } from '../dto/investors/investorsAcc.input';
import MUser from '@models/User';
import { InvestorDetailsInput, InvestorDetMigrateInput, UserEntAB } from '../entities/user.entity';
import { AccountPaginator, GetAccArgs } from '../dto/get-users.args';
import bcrypt from 'bcryptjs';
import { GetUserAccrArgs } from '../dto/get-user.args';
import { VerifyInvEmailArg } from '../dto/investors/get-inv-acc.args';
import { MAIL_CONTENT } from '@/util/mailer/templates/mailTemplate';
import { MailerService } from "@nestjs-modules/mailer";
import { randomNumberInRange } from '@/util/services/randomNumbers';
import _ from "lodash"
import { paginate } from '@/common/pagination/paginate';
import { INVESTOR_ACCOUNT_FILTER } from '@/util/constants/investors';

var ObjectId = require('mongoose').Types.ObjectId;

@Injectable()
export class InvestorUsersService {
    constructor(private mailerService: MailerService) { }

    async insertInvestorIds(params: InvestorMigrationInput): Promise<AccountPaginator> {

        let restructure = params.multiInvetsor.map((item: InvestorDetMigrateInput, index) => {
            return {
                username: item.investorId,
                investorDetails: {
                    investorId: item.investorId,
                    blocks: parseInt(item.blocks.toString())
                }
            }
        })


        let savedData = await MUser.insertMany(restructure)

        return savedData;
    }

    async investorRegistration(params: RegisterInputMU): Promise<UserRegResponseMU> {
        let savedData;

        if (params.password) {
            params.password = await bcrypt.hash(params.password, 10)
        }



        savedData = await MUser.findOneAndUpdate(
            { "investorDetails.investorId": params.investorDetails.investorId },
            {
                $set: {
                    "suffix": params.suffix,
                    "username": params.username,
                    "firstName": params.firstName,
                    "middleName": params.middleName,
                    "password": params.password,
                    "lastName": params.lastName,
                    "email": params.email,
                    "restrictionCode": ["POLL_INVESTOR_VOTE_PAGE"]

                }
            },
            { new: true },
        ).populate('departmentOnDuty');


        return savedData

    }


    async findSpecInvestor(payload: GetUserAccrArgs) {

        const data: UserEntAB[] = await MUser.findOne({ "investorDetails.investorId": payload.id })

        return {
            data: data ?? {}
        };
    }

    async verifyInvEmail(payload: VerifyInvEmailArg) {

        const verifCode = randomNumberInRange(11111, 99999)
        let respMail;
        let verifiedUser;

        if (payload.id || payload.email) {

            verifiedUser = await MUser.findOneAndUpdate(
                {
                    $or: [
                        { _id: payload.id },
                        { email: payload.email },
                    ]

                },
                {
                    $set: {
                        verificationCode: verifCode,
                        // email: payload.email
                    }
                },
                { new: true },
            )


            if (verifiedUser) {
                respMail = await this.mailerService.sendMail({
                    to: payload.email,
                    subject: 'ACEMCB ASM 2022 - Verification Code',
                    html: MAIL_CONTENT({ verifCode: verifCode.toString(), idNumber: payload.investorId }),
                    context: {
                        name: payload.email
                    }
                })
            }


        }

        return {
            data: {
                response: respMail.response,
                accepted: respMail.accepted,
                _id: _.get(verifiedUser, "_id")
            }
        };
    }

    async verifyInvEmailCode(payload: VerifyInvEmailArg) {

        let response = "failed"

        if (payload.id) {

            let result: UserEntAB = await MUser.findOne({ _id: new ObjectId(payload.id) })

            if (result && result.verificationCode === payload.emailCode) {
                // if (result.investorDetails.investorId === payload.investorId && result.verificationCode === payload.emailCode) {
                response = "success"

            }

        }

        return {
            data: {
                response: response
            }
        };
    }

    async searchInvestors({ page, first, name }: GetAccArgs) {

        let data: UserEntAB[] = []

        var nameRegex = new RegExp(name);
        if (name !== "") {
            data = await MUser.find(
                {
                    $and: [
                        INVESTOR_ACCOUNT_FILTER,
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
                    ]
                }
            )
                .collation({ locale: 'en_US' })
                // const data: UserEntAB[] = await MUser.find({id: "628f3358a8f49813a48c7df3"})
                .populate('departmentOnDuty')
                .populate('department');
        }
        return {
            data: data,
            paginatorInfo: paginate(data.length, page, first, data.length),
        };
    }
}