import { string } from 'yup';
import { DepartmentGenType } from '../departments/departmentTypes';


type defualtAccVals = {

}


export type AccFormValues = {
  _id?: string;
  username: string;
  firstName: string;
  middleName: string;
  suffix: string;
  nameExtension?: string;
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
  __typename?: any;
  blocks: number;
  isEmployee: boolean;
  investorId?: string;
  restrictionCode?: string[];
};

export type AccFormSubmission = {
  _id?: string;
  username?: string;
  firstName?: string;
  middleName?: string;
  suffix?: string;
  nameExtension?: string;
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

  // investors
  investorDetails?: InvestorDetails;
  blocks?: number;
  investorId?: string;
  isEmployee?: boolean;

  department?: any;
  restrictionCode?: string[]
  __typename?: any;
};

export type InvestorDetails ={
  isEmployee?: boolean;
  blocks?: number;
  investorId?: string;
}

type NotifConfigType ={
  isEnabled?: boolean;
  ringtone?: boolean;
}


export type AccountConfigType ={
  notification?: NotifConfigType;
}



// ====

export type AccountDataType = AccFormValues