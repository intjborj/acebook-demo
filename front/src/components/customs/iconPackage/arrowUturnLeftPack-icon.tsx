import ArchiveFillIcon from '@/components/icons/archive';
import { ArrowUturnLeftIcon } from '@heroicons/react/20/solid';
import React from 'react'
import IconButtonLayout from '../layouts/iconButton';

type Props = {
    href?: string;
}

const ArrowUturnLeftPackIcon = ({href}: Props) => {
  return (
    <div> <IconButtonLayout> <ArrowUturnLeftIcon /></IconButtonLayout></div>
  )
}

export default ArrowUturnLeftPackIcon