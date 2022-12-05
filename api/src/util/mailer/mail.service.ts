import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { EmailResponse, EmailSendEntInput } from "./dto/mail.args";
import { EmailSendEnt } from "./entities/mail.entity";
import { MAIL_CONTENT } from "./templates/mailTemplate";

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) { }

    async sendMail(params: EmailSendEntInput): Promise<EmailResponse> {

        await this.mailerService.sendMail({
            to: params.email,
            subject: 'Greeting from NestJS NodeMailer',
            // template: '../../../templates/email',
            html: MAIL_CONTENT({}),
            context: {
                name: params.name
            }
        })

        return {
            data: {
                name: " ds",
                email: "fdfd"
            }
        }
    }
}