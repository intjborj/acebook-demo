import { DEFAULT_IMAGE } from '@/constants/image';
import { avatarPlaceholder } from '@/lib/placeholders';
import { string } from 'yup';


type FileImporType = {
    type?: string;
    fileName?: string;
}


export const fileImport =(data: FileImporType)=>{
let pathUrl = process.env.NODE_ENV == "production"  ? process.env.NEXT_PUBLIC_FILE_SERVER_PROD : process.env.NEXT_PUBLIC_FILE_SERVER_DEV

let imageUrl= DEFAULT_IMAGE

    switch (data.type) {
        case 'profile':
            imageUrl = data.fileName ?(pathUrl+data.fileName) : avatarPlaceholder 
            break;
        case 'post':
            imageUrl = data.fileName ?(pathUrl+data.fileName) : DEFAULT_IMAGE 
            break;
        case 'preview':
            imageUrl = data.fileName ?(pathUrl+data.fileName) : 'fdsujfds.jpg' 
            break;
        default:
            break;
    }
    console.log("imageUrl", imageUrl)
    return imageUrl

}