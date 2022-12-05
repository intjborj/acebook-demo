import { PencilIcon } from '@/components/icons/pencil-icon';
import React from 'react'
import IconButtonLayout from '../layouts/iconButton';

type Props = {
    href?: string;
}

const EditPackIcon = ({href}: Props) => {
  return (
    <div>   <IconButtonLayout> <PencilIcon /></IconButtonLayout></div>
    // <div><Link href={`${href}`}>   <IconButtonLayout> <PencilIcon /></IconButtonLayout></Link></div>
  )
}

export default EditPackIcon