import { AccFormValues } from "../accounts/accountTypes";

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



};

export type TicketVarType = {
    name: string;
    code: string;
    color?: string;
    textColor?: string;
    class?: string;
}

export type TicketTypeForm = {
    code?: string;
    approvers?: string[];
}
export type TicketTypeFormDef = {
    code?: string | undefined;
    approvers?: object[];
}

export type ApproverType = {
    status?: string,
    updatedAt?: string,
    user?: string
}
