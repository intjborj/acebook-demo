export const viewPollImages = (path:string)=>{
    let endpoint = process.env.NODE_ENV == "production" ? process.env.NEXT_PUBLIC_FILE_SERVER_PROD : process.env.NEXT_PUBLIC_DEV_FRONTEND_ENDPOINT+'/uploads/'
    return `${endpoint}investors/${path}`
}

const logo = 'ace-logo.jpg'
let endpointDefImage = process.env.NODE_ENV == "production" ? `${process.env.NEXT_PUBLIC_FILE_SERVER_PROD}investors/` : process.env.NEXT_PUBLIC_DEV_INVESTOR_ENDPOINT
export const DEFAULT_POLL_IMAGE =  `${endpointDefImage}${logo}` 
