import Button from '@/components/admin/components/ui/button'
import React, {useState} from 'react'

type Props = {
  clicked?: any;
}

const PostFilters = (props: Props) => {
  const [type, setType] = useState<any>({type : null})

  const clickedButton = (type: string)=>{
      
      setType(type)
      props.clicked(type)
  }

  return (
    <div className='flex gap-2'>
      <Button variant={type == 'posts' ? `normal` : `outline`} onClick={()=>clickedButton('posts')} size='small'>Posts</Button>
      <Button  variant={type == 'tags' ? `normal` : `outline`} onClick={()=>clickedButton('tags')} size='small'>Tags</Button>
    </div>
  )
}

export default PostFilters