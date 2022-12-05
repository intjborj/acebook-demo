import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { DepartmentEnt } from 'src/acebook/masterdata/department/entities/department.entity';
import { CoreEntity } from '@/common/entities/core.entity';

@InputType('MuserInputType', { isAbstract: true })
@ObjectType()
export class MuserEnt extends CoreEntity {
  // username: string;
  // email: string;
  // password: string;
  // role: string;
  // token: string;

  username: string;
  firstName: string;
  middleName: string;
  lastName: string;
  position: string;
  isActive: boolean;
  isApprover: boolean;
  contact: string;
  email: string;
  password: string;
  role: string;
  token: string;
  departmentOnDuty: DepartmentEnt[];
  department: DepartmentEnt;
  restrictionCode: string[];
}
