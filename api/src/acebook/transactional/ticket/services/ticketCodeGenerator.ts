import TicketType from '@models/Masterdata/TicketType';
import Ticket from '@models/Transactionals/Tickets';

export function addLeadingZeros(num, totalLength) {
    return String(num).padStart(totalLength, '0');
}

async function codeGenerator(type: string) {
    let typePrefix = await TicketType.findOne({ code: type })


    let latestCol = await Ticket.findOne({ type: type }).sort({ created_at: -1 })
    let removedTypePrefix 
    if (latestCol) {
        let extractedCode = latestCol.code
        removedTypePrefix = extractedCode.slice(2);
    }else{
        removedTypePrefix = "0"
    }

    let increment = addLeadingZeros(parseInt(removedTypePrefix) + 1, 4)
    let mergedTypeIncrement = typePrefix.codePrefix.toString() + increment.toString()

    return mergedTypeIncrement
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

export async function ticketCodeGen(type: string) {

    let code: string = null
    let tempCode = await codeGenerator(type)
    let checkMain = await checkDuplicate(tempCode)
    if (checkMain) {
     
        let check = await checkDuplicate(tempCode)
        while (check) {
            check = await checkDuplicate(tempCode)
            if (check == false) {
                code = tempCode
                break;
            } else {
                tempCode = await codeGenerator(type)
            }
        }
    } else {
        code = tempCode
    }
    return code
}