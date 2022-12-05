import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';

import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailController } from './mail.resolver';
import { MailService } from './mail.service';




@Module({
  imports: [MailerModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (config: ConfigService) => ({
      transport: {
        host: "smtp.gmail.com",
        secure: false,
        auth: {
          user: "acemcfeedback@gmail.com",
          pass: "tnzvpazprafmggkz",
        },
      },
      defaults: {
        from: "<no_reply@acemcbohol.com>"   
      },
      template: {
        dir: join(__dirname, '../../../templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true
        }
      }
    }),
    inject: [ConfigService]
  }), ConfigModule.forRoot()],
  providers: [MailService, MailController],
})
export class MailModule {}