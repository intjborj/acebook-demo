import ArchiveFillIcon from '@/components/icons/archive';
import React from 'react'
import IconButtonLayout from '../layouts/iconButton';

type Props = {
    href?: string;
}

const ArchivePackIcon = ({href}: Props) => {
  return (
    <div> <IconButtonLayout> <ArchiveFillIcon /></IconButtonLayout></div>
  )
}

export default ArchivePackIcon