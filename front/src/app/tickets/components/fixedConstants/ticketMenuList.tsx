import { IconOne } from "@/components/icons/random/iconOne"
import { IconThree } from "@/components/icons/random/iconThree"
import { IconTwo } from "@/components/icons/random/iconTwo"
import { EntCounterType, MenuGrpAttType } from "@/types/custom"
import { TicketTabMenu } from "@/types/tickets/enums/ticketEnums"
import _ from "lodash"

type TicketMenuType = {
    approvalCount?: number;
    workCount?: number;
    moreCount?: number;
    assignedCount?: number | null;
    deptServiceTicketCount?: number | null;
    myApproved?: EntCounterType | null;
    myAssigned?: EntCounterType | null;
    myCreatedTickets?: EntCounterType | null;
    deptServTickets?: EntCounterType | null;
    deptTicketRequest?: EntCounterType | null;
    markedReceivedWorks?: EntCounterType | null;
    allTickets?: EntCounterType | null;

}


export function ticketMenuList({ approvalCount, workCount, assignedCount, deptServiceTicketCount, moreCount, ...data }: TicketMenuType) {
  
    
  
  
  
  
  
  
    let menu: MenuGrpAttType[] = [{
        name: "Requests",
        fetchCode: TicketTabMenu.MY_REQUESTS,
        isPublic: true
    }, {
        name: "Approvals",
        fetchCode: TicketTabMenu.FOR_APPROVAL,
        count: approvalCount,
        isPublic: true
    }, {
        name: "Works",
        fetchCode: TicketTabMenu.WORKS_RECEIVED_TO_REC,
        count: workCount,
        isPublic: true
    }, {
        name: "More",
        isDropdown: true,
        count: moreCount,
        isPublic: true,
        submenu: [
            {
                name: 'Assigned Tickets',
                route: '##',
                fetchCode: TicketTabMenu.MY_ASSIGNED_TICKETS_NOT_RECEIVED,
                icon: IconTwo,
                countObj: {
                    ...data.myAssigned,
                    allRoute: TicketTabMenu.MY_ASSIGNED_TICKETS,
                    newRoute: TicketTabMenu.MY_ASSIGNED_TICKETS_NOT_RECEIVED
                },
                isPublic: true
            },
            {
                name: 'My Approved Tickets',
                route: '##',
                fetchCode: TicketTabMenu.APPROVED,
                countObj: data.myApproved,
                icon: IconOne,
                isPublic: true
            },

            {
                name: 'Created Tickets',
                fetchCode: TicketTabMenu.MY_CREATED_TICKETS,
                route: '##',
                icon: IconThree,
                countObj: data.myCreatedTickets,
                isPublic: true
            },
            {
                name: 'Department Service Tickets',
                route: '##',
                fetchCode: TicketTabMenu.MY_DEPARTMENT_SERVICE_TICKETS,
                icon: IconOne,
                // countObj: data.deptServTickets,
                countObj: {
                    ...data.deptServTickets,
                    allRoute: TicketTabMenu.MY_DEPARTMENT_SERVICE_TICKETS,
                    newRoute: TicketTabMenu.MY_DEPARTMENT_SERVICE_TICKETS_PENDING
                },
                isPublic: true
            },
            {
                name: 'Department Ticket Requests',
                route: '##',
                fetchCode: TicketTabMenu.MY_DEPARTMENT_TICKET_REQUEST,
                icon: IconTwo,
                countObj: data.deptTicketRequest,
                isPublic: true
            },
            {
                name: 'Marked Received Works',
                route: '##',
                fetchCode: TicketTabMenu.WORKS_RECEIVED_MARKED,
                icon: IconThree,
                countObj: data.markedReceivedWorks,
                isPublic: true
            },
            {
                name: 'All Tickets',
                route: '##',
                restriction: "VIEW_ALL_TICKETS",
                fetchCode: TicketTabMenu.ALL_TICKETS,
                icon: IconOne,
                countObj: data.allTickets,
                isPublic: false
            },
        ]

    }]

    return menu
}