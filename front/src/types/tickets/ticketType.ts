import { AccFormValues, AccountDataType } from "@/types/accounts/accountTypes";
import { DepartmentGenType } from "@/types/departments/departmentTypes";
import { AttachmentObj } from "@/types/workDetails/workTypes";
import { AssetType } from "../assets/assetsType";

export type TicketFormValues = {
    _id?: string;
    username?: string;
    firstName?: string;
    middleName?: string;
    suffix?: string;
    lastName?: string;
    position?: string;
    createdBy?: string | object;
    requestedBy?: string;
    serviceDepartment?: string;
    requestingDepartment?: string;
    type?: string | undefined;
    approvers?: object[];
    status?: string;
    postOrigin?: string;
    approvers_temp?: string;
    __typename?: string;
    assignedPersonnel?: any;

    dateRequested?: string;
    description?: string;
    location?: string;
    subject?: string;
    dateNeeded?: string;
    code?: string;
    serviceDepartmentId?: string;
    created_at?: Date;
    attachments_image?: any;
    asset?: string;
    isOverride?: boolean;

};

export type TicketVarType = {
    name: string;
    code: string;
    color?: string;
    textColor?: string;
    class?: string;
}

export type TicketTypeCommon = {
    name?: string;
    addWorkWOApprovers?: boolean;
    addWorkWOAssignedP?: boolean;
    isDisabled?: boolean;
}


export type TicketTypeStrings = {
    code?: string;
    approvers?: string[];
    assignments?: string[];
    submissionDepartment?: string[];
    serviceDepartment?: string[];
}

export type TicketTypeFormObj = {
    code?: string | undefined;
    approvers?: object[];
    assignments?: object[];
    submissionDepartment?: object[];
    serviceDepartment?: object[];
}

export type TicketTypeForm = TicketTypeCommon & TicketTypeStrings
export type TicketTypeFormDef = TicketTypeCommon & TicketTypeFormObj 

export type ApproverType = {
    status?: string,
    updatedAt?: string,
    user?: string
}
// ======
// sample combinations 
// type Combined = ClientRequest & Coords;
// sample combinations


type TicketCommons = {
    _id?: string;
    username?: string;
    firstName?: string;
    middleName?: string;
    suffix?: string;
    lastName?: string;
    position?: string;
    type?: string | undefined;
    status?: string;
    approvers_temp?: string;
    dateRequested?: string;
    description?: string;
    location?: string;
    subject?: string;
    dateNeeded?: string;
    code?: string;
    asset?: AssetType;

}

type TicketSubTypes = {
    createdBy?: AccountDataType;
    requestedBy?: AccountDataType;
    serviceDepartment?: DepartmentGenType;
    requestingDepartment?: DepartmentGenType;
    attachments?: AttachmentObj[];
    approvers?: object[];
    postOrigin?: string;
    assignedPersonnel?: any;
    works?: any;
}


export type TicketDataType = TicketCommons & TicketSubTypes;