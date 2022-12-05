import { FilePath } from "./enums/paths";

let domain = process.env.NODE_ENV === "development"?  process.env.NEXT_PUBLIC_FILE_SERVER_DEV : process.env.NEXT_PUBLIC_FILE_SERVER_PROD
export const DEFAULT_IMAGE = `${domain}${FilePath.DEFAULT_IMAGE}`
export const COMPANY_LOGO = `${domain}${FilePath.COMPANY_LOGO}`
// export const DEFAULT_IMAGE = '/img/default-image.jpg'