var CryptoJS = require("crypto-js");

type EncryptionHookType = {
    ciphered: string;
    deciphered: string;
}

export function useEncryption(type: string, text: string | undefined) {
    let ciphered: string = ''
    let deciphered: string = ''

    switch (type) {
        case "cipher":
            if (text) {
                ciphered = CryptoJS.AES.encrypt(text, process.env.NEXT_PUBLIC_CLIENT_ENC_SECRET as string).toString();
            }
            return ciphered
            break;

        case "decipher":
            if (text) {
                let bytes = CryptoJS.AES.decrypt(text, process.env.NEXT_PUBLIC_CLIENT_ENC_SECRET as string);
                deciphered = bytes.toString(CryptoJS.enc.Utf8);
            }
            return deciphered
            break;

        default:
            break;
    }



}