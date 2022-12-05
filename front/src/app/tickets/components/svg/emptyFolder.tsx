import EmptyDataFolderSvg from '@/components/customs/information/emptyDataFolder'
import React from 'react'

type Props = {}

const TicketEmptyFolder = (props: Props) => {
  return (
  <div className=' flex justify-center'>  <div className=' w-32 '><EmptyDataFolderSvg/></div></div>
  )
}

export default TicketEmptyFolder