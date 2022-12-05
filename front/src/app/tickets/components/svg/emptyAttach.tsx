import EmptyAttchSvg from '@/components/customs/information/emptyAttchments'
import EmptyDataFolderSvg from '@/components/customs/information/emptyDataFolder'
import EmptyFeedbackSvg from '@/components/customs/information/emptyFeedback'
import React from 'react'

type Props = {}

const TicketEmptyAttach = (props: Props) => {
  return (
  <div className=' flex justify-center'>  <div className=' w-32 '><EmptyAttchSvg/></div></div>
  )
}

export default TicketEmptyAttach