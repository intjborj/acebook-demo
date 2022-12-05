import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { CoreEntity, CoreEntityMg } from '@/common/entities/core.entity';

@InputType('AssSupplierInputType', { isAbstract: true })
@ObjectType()
export class SupplierEnt extends CoreEntityMg {
  name?: string;
  migrationId?: string;
  mobile?: string;
  email?: string;
  url?: string;
  information?: string;
  address?: string;
  contactPerson?: string;
  contactTelephone?: string;
  contactEmail?: string;
}
