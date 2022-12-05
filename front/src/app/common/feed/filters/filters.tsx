import Button from '@/components/admin/components/ui/button'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import { route } from 'next/dist/server/router';
import { FrontPath } from '@/constants/enums/paths';
import { getAuthCredentials } from "@utils/auth-utils";
import _ from 'lodash';
import FucntionRestriction from '@/app/restrictions/system/function'

type Props = {
  clicked?: any;
  menuDisplay?: PostMenuDisplay[] | string[]
}

export enum PostMenuDisplay {
  POST = "post",
  TAGS = "tags",
  ARCHIVES = "archives",
  MY_POSTS = "myPosts",
  ALL_DEPTS = "allDepts",
}

const PostMenu = ({ menuDisplay }: Props) => {
  const router = useRouter();
  const { token, permissions, id, user } = getAuthCredentials();
  const { query } = useRouter();
  const { searchType, ...restQuery } = query;

  const [type, setType] = useState<any>({ type: restQuery.type ?? null })

  useEffect(() => {
    if (restQuery) {
      setType(restQuery.type)
    }
  }, [restQuery])


  const clickedButton = (type: string) => {
    setType(type)

    switch (type) {
      case "post":
        router.push(`${FrontPath.DEPARTMENT_POST}/${_.get(user, "departmentOnDuty._id")}?type=post`)
        break;
      case "tags":
        router.push(`${FrontPath.DEPARTMENT_POST_TAGS}/${_.get(user, "departmentOnDuty._id")}?type=tags`)
        break;
      case "myPosts":
        router.push(`${FrontPath.MY_POSTS}/${_.get(user, "_id")}?type=myPosts`)
        break;
      case "archives":
        router.push(`${FrontPath.MY_POSTS_ARCHIVE}/${_.get(user, "_id")}?type=archives`)
        break;
      case "allDepts":
        router.push(`${FrontPath.ALL_DEPT_POST}/${_.get(user, "_id")}?type=allDepts`)
        break;

      default:
        break;
    }

    // router.push()
    // props.clicked(type)
  }

  return (
    <div className='flex gap-2'>
      {menuDisplay?.includes(PostMenuDisplay.POST) && <Button variant={type == 'post' ? `normal` : `outline`} onClick={() => clickedButton('post')} size='small'>Posts</Button>}
      {menuDisplay?.includes(PostMenuDisplay.TAGS) && <Button variant={type == 'tags' ? `normal` : `outline`} onClick={() => clickedButton('tags')} size='small'>Tags</Button>}
      {menuDisplay?.includes(PostMenuDisplay.MY_POSTS) && <Button variant={type == 'myPosts' ? `normal` : `outline`} onClick={() => clickedButton('myPosts')} size='small'>My Posts</Button>}
      {menuDisplay?.includes(PostMenuDisplay.ARCHIVES) && <Button variant={type == 'archives' ? `normal` : `outline`} onClick={() => clickedButton('archives')} size='small'>Archives</Button>}
      {menuDisplay?.includes(PostMenuDisplay.ALL_DEPTS) &&
        <FucntionRestriction code='VIEW_ALL_DEPT_POSTS'><Button variant={type == 'allDepts' ? `normal` : `outline`} onClick={() => clickedButton('allDepts')} size='small'>All Depts</Button></FucntionRestriction>
      }

    </div>
  )
}

export default PostMenu