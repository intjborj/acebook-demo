import PostTagIcon from '@/components/tags/tagIcon';

export const addPostTagLayout = (data: any) => {
    
    let allPostsTemp = data.map((item: any) => {
        let tags = [];
        let tagsRaw = [];

        if (item.taggedDepartments) {
            let name: string;
            if (item.taggedDepartments.length > 1) {
                name = item.taggedDepartments[0].name + ' and other ' + (item.taggedDepartments.length - 1) + ((item.taggedDepartments.length - 1) > 1 ? ' Departments' : ' Department');
            } else if (item.taggedDepartments.length == 1) {
                name = item.taggedDepartments[0].name;
            }

            tagsRaw = item.taggedDepartments.map((i: any) => {
                return i.name
            })


           
                tags.push({
                    content: <PostTagIcon identifier={item.taggedDepartments.length} name={name} />,
                    contentRaw: tagsRaw
                })
           
        }

        item.tags = tags

        return item;

    })

    return allPostsTemp;
}