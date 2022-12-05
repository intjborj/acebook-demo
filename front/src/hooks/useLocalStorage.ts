type PropsType = {
    type: string;
    variable: string;
    value?: any;
}

export const useLocalStorage = ({ type, variable, value }: PropsType) => {

    switch (type) {
        case "set":
            localStorage.setItem(variable, value ?? '')
            break;
        case "get":
            const saved = localStorage.getItem(variable);
            const initialValue = saved
            return initialValue
            break;
        default:
            break;
    }

}