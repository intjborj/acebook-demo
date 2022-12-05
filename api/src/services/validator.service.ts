export const validatePHContact = (contact: string) => {
    if (contact) {
        let format = `^(09|\\+639)\\d{9}$`
        const regex = new RegExp(format);
        
        return regex.test(contact)

    } else {
        return false
    }

}