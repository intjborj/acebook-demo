import path from "path";

export const UPLOAD_LINK = (type:string, image: string)=>{
  return  process.env.NODE_ENV == "production"  ? `${process.env.NEXT_PUBLIC_FILE_SERVER_PROD}${image}` : `${process.env.NEXT_PUBLIC_FILE_SERVER_DEV}${image}`;
    // return process.env.NODE_ENV == 'production' ?  `\\\\172.16.12.30\\misbackup\\acebook\\public\\uploads\\${type}\\${image}\\` : path.join(process.cwd(), `uploads/${type}/${image}`)   





    // return `file:\\\\172.16.12.30\\misbackup\\acebook\\public\\uploads\\${image}\\`
    // path.join(process.cwd(), `uploads/${image}`) 
    // return path.join(process.cwd(), `uploads/${image}`) 
    // return '../../../../uploads/'+image
}

export const UPLOAD_DOMAIN = process.env.NEXT_UPLOAD_DOMAIN
// export const UPLOAD_DOMAIN = 'http://localhost:3001'