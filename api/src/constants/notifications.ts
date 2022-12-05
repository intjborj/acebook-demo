


export enum NotifMessageType {
    DEPARTMENT = "department",
    POST_TAG = "post_tag",
    POST_COMMENT = "post_comment",
    POST_CREATE_TICKET = "post_create_ticket",
    NOTIFY_TICKET_APPROVERS_APPROVAL = "notify_ticket_approvers_approval",
    NOTIFY_TICKET_REQUESTOR_APPROVED = "notify_ticket_requestor_approved",
    NOTIFY_TICKET_REQUESTOR_DISAPPROVED = "notify_ticket_requestor_disapproved",
    NOTIFY_TICKET_REQUESTOR_APP_TO_PENDING = "notify_ticket_requestor_app_to_pending",
    NOTIFY_TICKET_REQUESTOR_DISAPP_TO_PENDING = "notify_ticket_requestor_disapp_to_pending",
    NOTIFY_TICKET_ASSIGN_PERSON = "notify_ticket_assign_person",
    NOTIFY_TICKET_REQUESTOR_TASK_RECEIVED = "notify_ticket_requestor_task_received",
    NOTIFY_TICKET_WORK_SUBMISSION_DEPARTMENT = "notify_ticket_work_submission_department",
    NOTIFY_TICKET_REQUESTOR_FINAL_STATUS_CHANGED = "notify_ticket_requestor_final_status_changed"
}

export const SmsNotifTypes: NotifMessageType[] | string[] = [
    NotifMessageType.DEPARTMENT,
    NotifMessageType.POST_TAG, 
    NotifMessageType.NOTIFY_TICKET_APPROVERS_APPROVAL,
    NotifMessageType.NOTIFY_TICKET_REQUESTOR_DISAPPROVED,
    NotifMessageType.NOTIFY_TICKET_REQUESTOR_APPROVED,
    NotifMessageType.NOTIFY_TICKET_ASSIGN_PERSON,
    NotifMessageType.NOTIFY_TICKET_WORK_SUBMISSION_DEPARTMENT,
    NotifMessageType.NOTIFY_TICKET_REQUESTOR_FINAL_STATUS_CHANGED,
    NotifMessageType.POST_COMMENT,
    NotifMessageType.POST_CREATE_TICKET,

]

type NotifMessage = {
    type?: NotifMessageType;// Message type 
    user?: string; // no use
    code?: string; // entity CODE to be display
    fromUserName?: string; // Name to display on the message
    message?: string; // Partial message or preview of the notification
}

export const notifMessage = ({ type, message, fromUserName, code }: NotifMessage) => {

    let restMssg = (message && message.length > 20) ? message.substring(0, 100) + "..." : message;
    // let restMssg = (message && message.length > 20) ? message.substring(0, 50) + "..." : message;

    switch (type) {
        case "post_tag":
            return `${fromUserName} tagged your department on a post: "${restMssg}"`
            break;

        case "post_comment":
            return `${fromUserName} commented on your post: "${restMssg}"`
            break;

        case "post_create_ticket":
            return `${fromUserName} converted your post to ticket #${code}: "${restMssg}"`
            break;

        case "notify_ticket_approvers_approval":
            return `${fromUserName} requested your approval for the ticket #${code} : "${restMssg}"`
            break;

        case "notify_ticket_requestor_approved":
            return `Your ticket request #${code} has been APPROVED, service department will now proceed to the task.`
            break;

        case "notify_ticket_requestor_disapproved":
            return `Your ticket request #${code} has been DISAPPROVED, you may modify the details of your request for reapproval.`
            break;

        case "notify_ticket_requestor_app_to_pending":
            return `Your ticket request #${code} has been changed to PENDING from approved.`
            break;

        case "notify_ticket_requestor_disapp_to_pending":
            return `Your ticket request #${code} has been changed to PENDING from disapproved.`
            break;

        case "notify_ticket_assign_person":
            return `You have been assigned. Ticket #${code} is now open for works, you may now recieve the task.`
            break;

        case "notify_ticket_requestor_task_received":
            return `Assigned personnel of your ticket request #${code} has received the task, keep posted for the work details.`
            break;

        case "notify_ticket_work_submission_department":
            return `Your department has received new work output from ticket work code #${code}`
            break;

        case "notify_ticket_requestor_final_status_changed":
            return `Your ticket request #${code} has final status: ${message}`
            break;

        default:
            break;
    }

} 