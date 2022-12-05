export type AttachmentObj = {
    path?: string;
    type?: string;
}


type WorkCommons = {
    _id?: string;
    descActualWorkDone?: string;
    findings?: string;
    dateTimeStarted?: string;
    dateTimeFinished?: string;
    code?: string
    workCode?: string
    workStatus?: string;
    created_at?: string;
    updated_at?: string;
    attachments_image?: any;
    attachments?: AttachmentObj[];
    submissionDepartment?: any;
    performedBy?: any;
    assetVariation?: any;
    isArchived?: boolean;
    archiveRemarks?: string;
    workCategory?: any
}


export type WorkFormValues = WorkCommons;