import React from 'react'
import * as categoriesIcon from "@admin/components/icons/category";
import { tagIcons } from '@/components/admin/components/tag/tag-icons';
import { getIcon } from "@utils/get-icon";
import Label from "@admin/components/ui/label";
import SelectInput from "@admin/components/ui/select-input";
import { postSelectStyles } from '@/components/admin/components/ui/select/post-select-privacy.styles';

type Props = {
    control: any;
    register: any;
}

export const PrivacyLabeler = (data: string) => {
    switch (data) {
        case "Public":
            return "Public"
            break;
        case "OwnDepartment":
            return "Own Department"
            break;
        case "TaggedDepartments":
            return "Tagged Departments"
            break;
        case "TaggedUsers":
            return "Tagged Users"
            break;
        default:
            return ''
            break;

    }
}

const privacyMenu = [
    { value: "Public", label: "Public" },
    { value: "OwnDepartment", label: "Own Department" },
    { value: "TaggedDepartments", label: "Tagged Department" },
    // { value: "OnlyMe", label: "Only Me" },
    { value: "TaggedUsers", label: "Tagged Users" },
]


export const updatedIcons = privacyMenu.map((item: any) => {
    item.label = (
        <div className="flex space-s-5 items-center">
            <span className="flex w-5 h-5 items-center justify-center">
                {getIcon({
                    iconList: categoriesIcon,
                    iconName: item.value,
                    className: "max-h-full max-w-full",
                })}
            </span>
            <span>{item.label}</span>
        </div>
    );
    return item;
});

const PostPrivacy = ({ control, register }: Props) => {


    return (
        <div>
            <div className="mb-5">
                {/* <Label>Privacy</Label> */}
                <div className='w-60'>
                    {/* <div className='w-60'> */}
                    <SelectInput
                        {...register('privacy')}
                        // name="icon"
                        customStyle={postSelectStyles}
                        control={control}
                        options={updatedIcons}
                        getOptionValue={(option: any) => option.value}
                        isClearable={false}
                        isSearchable={false}
                    // defaultvalue={updatedIcons[0]}

                    />
                </div>

            </div>
        </div>
    )
}

export default PostPrivacy