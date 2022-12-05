import { MuserEnt } from '@/acebook/masterdata/musers/entities/muser.entity';
import { UserEntAB } from '@/users/entities/user.entity';
import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { CoreEntity, CoreEntityMg } from '@/common/entities/core.entity';

// @ObjectType()
// export class TicketTypeCommon extends CoreEntityMg {
//   name?: string;
//   code?: string;
// }



@ObjectType()
export class EmailSendEnt  {
  email?: string;
  name?: string;
}
