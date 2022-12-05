import { FilterIcon } from '@/components/icons/filter-icon';
import React from 'react'
import IconButtonLayout, { IconBtnProps } from '../layouts/iconButton';

type Props = {
    href?: string;
    layoutProps?: IconBtnProps;
}

const FilterPackIcon = ({href, layoutProps}: Props) => {
  return (
    <div> <IconButtonLayout {...layoutProps}> <FilterIcon /></IconButtonLayout></div>
  )
}

export default FilterPackIcon