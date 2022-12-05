import Trash from '@/components/icons/trash';
import React from 'react'
import IconButtonLayout from '../layouts/iconButton';

type Props = {
    href?: string;
}

const DeletePackIcon = ({href}: Props) => {
  return (
    <div> <IconButtonLayout> <Trash /></IconButtonLayout></div>
  )
}

export default DeletePackIcon