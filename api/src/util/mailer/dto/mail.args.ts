import { ArgsType, ObjectType } from '@nestjs/graphql';
import { EmailSendEnt } from '../entities/mail.entity';


@ObjectType()
export class EmailResponse {
  data: EmailSendEnt;
}




@ArgsType()
export class EmailSendEntInput  {
  email?: string;
  name?: string;
}

@ObjectType()
export class MailResponseData {
  data: MailResponse;
}

@ObjectType()
export class MailResponse {
 response: string;
 accepted: string[];
 _id?: string;
}

