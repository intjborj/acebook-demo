export const usePassedDateCheck = (date : any) => {
    let providedDate = new Date(date)
    let currentDate = new Date()

    if(providedDate < currentDate){
        return true
    }else{
        return false
    }

}   