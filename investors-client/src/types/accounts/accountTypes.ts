import { DepartmentGenType } from '../departments/departmentTypes';


type defualtAccVals = {

}


export type AccFormValues = {
  _id?: string;
  username: string;
  firstName: string;
  middleName: string;
  suffix: string;
  lastName: string;
  position: string;
  isActive: boolean;
  isApprover: boolean;
  contact: string;
  email: string;
  password?: string;
  confPassword: string | undefined;
  departmentOnDuty?: DepartmentGenType;
  department: DepartmentGenType[];
  updated_at?: string;
  created_at?: string;
  profilePicture?: string;
  restrictionCode?:string[] | undefined | null
};

export type AccFormSubmission = {
  _id?: string;
  username?: string;
  firstName?: string;
  middleName?: string;
  suffix?: string;
  lastName?: string;
  position?: string;
  isActive?: boolean;
  isApprover?: boolean;
  contact?: string;
  email?: string;
  password?: string;
  confPassword?: string | undefined;
  departmentOnDuty?: string;
  updated_at?: string;
  created_at?: string;

  attachments_image?: any;
  profilePicture?: any;
};
