export type WorkCategoryType = {
    label?: string,
    value?: string,
}

export const workCategoryOptions : WorkCategoryType[]= [
    {
        label: "Preventive",
        value: "preventive"
    },
    {
        label: "Corrective",
        value: "corrective"
    },
    {
        label: "Installation",
        value: "installation"
    },
    {
        label: "Callibration",
        value: "callibration"
    },
    {
        label: "Searching",
        value: "searching"
    },
]


export const workCatIdentifier = (code:string, type: string)=>{
    
    switch (type) {
        case "object":
            let obj = workCategoryOptions.find((item: WorkCategoryType)=> code === item.value)
            return obj
            break;
    
         case "label":
            let objW = workCategoryOptions.find((item: WorkCategoryType)=> code === item.value)
            return objW?.label
            break;
    
        default:
            break;
    }

}