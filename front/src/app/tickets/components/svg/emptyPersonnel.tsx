import EmptyDataFolderSvg from '@/components/customs/information/emptyDataFolder'
import EmptyPersonnelSvg from '@/components/customs/information/emptyPersonnel'
import React from 'react'

type Props = {}

const TicketEmptyPersonnel = (props: Props) => {
  return (
  <div className=' flex justify-center'>  <div className=' w-32 '><EmptyPersonnelSvg/></div></div>
  )
}

export default TicketEmptyPersonnel