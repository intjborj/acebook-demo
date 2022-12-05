import { Eye } from '@/components/icons/eye-icon';
import { EyeFill } from '@/components/icons/eye-icon-fill';
import React from 'react'
import IconButtonLayout from '../layouts/iconButton';

type Props = {
    href?: string;
}

const EyePackIcon = ({href}: Props) => {
  return (
    <div> <IconButtonLayout> <EyeFill /></IconButtonLayout></div>
  )
}

export default EyePackIcon