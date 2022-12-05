import { Controller, Post, Query } from "@nestjs/common";
import { Mutation, Args } from "@nestjs/graphql";
import { EmailResponse, EmailSendEntInput } from "./dto/mail.args";
import { EmailSendEnt } from "./entities/mail.entity";
import { MailService } from "./mail.service";

@Controller('mail')
export class MailController {
    constructor(private readonly mailService: MailService) { }

    // @Mutation('send')
    // async sendEmail(@Query('email') email, @Query('name') name) {
    //     return await this.mailService.sendMail(email, name);
    // }


    @Mutation(() => EmailResponse)
    async sendEmail(
        @Args() params: EmailSendEntInput,
    ): Promise<EmailResponse> {

        return this.mailService.sendMail(params);
    }
}

