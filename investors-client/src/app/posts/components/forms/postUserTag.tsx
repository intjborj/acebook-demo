import React from 'react'
import * as categoriesIcon from "@admin/components/icons/category";
import { tagIcons } from '@/components/admin/components/tag/tag-icons';
import { getIcon } from "@utils/get-icon";
import Label from "@admin/components/ui/label";
import SelectInput from "@admin/components/ui/select-input";
import { postSelectStylesTags } from '@/components/admin/components/ui/select/post-select-tags.styles';

type Props = {
    control: any;
    register: any;
}

const privacyMenu = [
    { value: "Public", label: "Public" },
    { value: "OwnDepartment", label: "Own Department" },
    { value: "taggedDepartments", label: "Tagged Department" },
    { value: "OnlyMe", label: "Only Me" },
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

const PostDepartmentTag = ({ control, register }: Props) => {

  
    return (
        <div>
            <div className="mb-5">
                {/* <Label>Privacy</Label> */}
                <div className='w-full'>
                    {/* <div className='w-60'> */}
                    <SelectInput
                        {...register('taggedDepartments')}
                        // name="icon"
                        customStyle={postSelectStylesTags}
                        control={control}
                        options={updatedIcons}
                        getOptionValue={(option: any) => option.value}
                        isClearable={false}
                        placeholder="@ Mention Departments"
                        isMulti={true}
                        // isSearchable={false}
                        // defaultvalue={updatedIcons[0]}

                    />
                </div>

            </div>
        </div>
    )
}

export default PostDepartmentTag