import * as categoriesIcon from "@admin/components/icons/category";
import { getIcon } from "@utils/get-icon";

type Props ={
    iconName: string;
    label: string
}


export const SelectContainerIcon = ({iconName, label} : Props) => {
    return (<div className="flex space-s-5 items-center">
        <span className="flex w-5 h-5 items-center justify-center">
            {getIcon({
                iconList: categoriesIcon,
                iconName: iconName,
                className: "max-h-full max-w-full",
            })}
        </span>
        <span>{label}</span>
    </div>)
}