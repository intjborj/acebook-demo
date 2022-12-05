import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { CoreEntity, CoreEntityMg } from '@/common/entities/core.entity';

@InputType('AccConfigEntInputType', { isAbstract: true })
@ObjectType()
export class AccConfigEnt extends CoreEntityMg {
  notification?: NotifConfigEnt
}

@InputType('AccConfigNotifInputType', { isAbstract: true })
@ObjectType()
export class NotifConfigEnt {
  isEnabled?: boolean;
  ringtone?: string;
}



@InputType('AccConfigInputType', { isAbstract: true })
@ObjectType()
export class AccConfigEntInput extends AccConfigEnt {
  type?: string
}

