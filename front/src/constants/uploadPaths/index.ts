enum UploadType {
    image = 'image',
    file = 'file',
}
export const TicketUploadPath = ({code, fileName}:{code:string, fileName?:string})=>{
    let initial = `tickets/${code}/attachments`

    if(fileName){
        initial +=`/${fileName}`
    }

    return  initial
}

export const TicketWorksUploadPath = ({ticketCode, workCode, fileName}:{ticketCode:string,workCode:string, fileName?:string})=>{
    let initial =  `tickets/${ticketCode}/works/${workCode}`
    if(fileName){
        initial +=`/${fileName}`
    }
    return  initial
}

export const PromotionsUploadPath = ({fileName}:{fileName?:string})=>{
    let initial =  `promotions`
    if(fileName){
        initial +=`/${fileName}`
    }
    return  initial
}

const UserFolder = ({id}:{id?:string})=>{
    return `profiles/${id}`
}

export const ProfilePicUploadPath = ({fileName, id}:{fileName?:string, id?:string})=>{
    // let initial =  `profiles/${id}/display_picture`
    let initial =  `${UserFolder({id})}/display_picture`
    if(fileName){
        initial +=`/${fileName}`
    }
    return  initial
}

// Old
export const PostUploadPath = ({fileName, id}:{fileName?:string, id?:string})=>{
    let initial =  `images`
    if(fileName){
        initial +=`/${fileName}`
    }
    return  initial
}

export const PostAttachmentUploadPath = ({fileName, id, type}:{fileName?:string, id:string, type:UploadType | string})=>{
    let initial =  `${UserFolder({id})}/post/${type}`
    if(fileName){
        initial +=`/${fileName}`
    }
    return  initial
}



