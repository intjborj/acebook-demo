import { SelectContainerIcon } from "@/components/ui/select/select-container-icon";
import * as categoriesIcon from "@admin/components/icons/category";
import { getIcon } from "@utils/get-icon";




export const defaultValuesPost = {
    privacy: {
        value: "Public", label: (
            // <div className="flex space-s-5 items-center">
            //     <span className="flex w-5 h-5 items-center justify-center">
            //         {getIcon({
            //             iconList: categoriesIcon,
            //             iconName: "Public",
            //             className: "max-h-full max-w-full",
            //         })}
            //     </span>
            //     <span>Public</span>
            // </div>
            <SelectContainerIcon iconName="Public" label="Public"/>
        )
    },
    taggedDepartments: null
}
