import Ticket from '@models/Transactionals/Tickets';
import WorkDetail from '@models/Transactionals/WorkDetails';
import { addLeadingZeros } from '../../ticket/services/ticketCodeGenerator';

async function codeGenerator(ticketId: string) {
    let checkNum = await Ticket.findOne({ _id: ticketId })


    let increm = checkNum.works.length + 1

    return `${checkNum.code}-${addLeadingZeros(increm, 2)}`
}

async function checkDuplicate(code: string) {
    let ticket = await Ticket.findOne({ code: code })
    // console.log(ticket)
    if (ticket) {
        return true
    } else {
        return false
    }

}


export async function workCodeGen(ticketId: string) {

    let code: string = null
    let tempCode = await codeGenerator(ticketId)
  
    let checkMain = await checkDuplicate(tempCode)
    if (checkMain) {

        let check = await checkDuplicate(tempCode)
        while (check) {
            check = await checkDuplicate(tempCode)
            if (check == false) {
                code = tempCode
                break;
            } else {
                tempCode = await codeGenerator(ticketId)
            }
        }
    } else {
        code = tempCode
    }
    return code

}