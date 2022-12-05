import { TicketVarType } from "@/types/tickets/ticketType";
import _ from "lodash";

export const TICKET_TYPE: TicketVarType[] = [
    { name: "Equipment Maintenance", code: "EquipmentMaintenance" },
    { name: "CCTV Review", code: "CCTVReview" },
    { name: "HIS Client Concern", code: "HISClientConcern" },
    { name: "HIS Development Request", code: "HISDevelopmentRequest" },
]

export const GENERAL_STATUS: TicketVarType[] = [
    { name: "Draft", code: "draft", color: "#eeeeee", textColor: "#bcbcbc", class: "bg-[#eeeeee] text-[#bcbcbc]" },
    { name: "Returned", code: "returned", color: "#f1c232", textColor: "#7f6000", class: "bg-[#f1c232] text-[#7f6000]" },
    { name: "Pending", code: "pending", color: "#b6d7a8", textColor: "#6aa84f", class: "bg-[#b6d7a8] text-[#6aa84f]" },
    { name: "Approved", code: "approved", color: "#38761d", textColor: "#ffffff", class: "bg-[#38761d] text-[#ffffff]" },
    { name: "Disapproved", code: "disapproved", color: "#cc0000", textColor: "#ffffff", class: "bg-[#cc0000] text-[#ffffff]" },
    { name: "Task Received", code: "task_received", color: "#38761d", textColor: "#ffffff", class: "bg-[#38761d] text-[#ffffff]" },
    { name: "Working", code: "working", color: "#cd5400", textColor: "#ffffff", class: "bg-[#cd5400] text-[#ffffff]" },
    // { name: "Completed", code: "completed", color: "#effffe", textColor: "#9fc5e8", class: "bg-[#effffe] text-[#9fc5e8]" },
    { name: "Completed", code: "completed", color: "#effffe", textColor: "#9fc5e8", class: "bg-emerald-200 text-emerald-600" },
    { name: "Success", code: "success", class: "bg-emerald-200 text-emerald-600" },
    { name: "Closed", code: "closed", class: "bg-slate-500 text-white" },
    { name: "Failed", code: "failed", class: "bg-rose-500 text-white" },
]

export const ALL_TICKET_STATUS_CODES = _.map(GENERAL_STATUS, 'code')

export const GEN_ENUMS: TicketVarType[] = [
    { name: "Equipment Maintenance", code: "EquipmentMaintenance" },
]





export const ticketTypeIdentifier = (code: string, type: string)  => {
    let ticket = TICKET_TYPE.filter((item: TicketVarType) => {
        return item.code === code
    })
    
    switch (type) {
        case "name":
            return ticket && ticket[0].name ?ticket[0].name : ''
            break;
        case "object":
            return ticket && ticket[0] ? ticket[0] : {}
            break;
        default:
            break;
    }

    return ''

    // return ticket[0].name
}

export const ticketStatusIdentifier = (code: string, type: string) => {
    let ticket = GENERAL_STATUS.filter((item: TicketVarType) => {
        return item.code === code
    })

    switch (type) {
        case "name":
            return ticket[0].name
            break;
        case "color":
            return ticket[0].color
            break;
        case "textColor":
            return ticket[0].textColor
            break;
        case "object":
            return ticket[0]
            break;
        case "class":
            return ticket[0].class
            break;
        default:
            break;
    }

}