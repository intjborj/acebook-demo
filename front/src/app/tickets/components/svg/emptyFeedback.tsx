import EmptyDataFolderSvg from '@/components/customs/information/emptyDataFolder'
import EmptyFeedbackSvg from '@/components/customs/information/emptyFeedback'
import React from 'react'

type Props = {}

const TicketEmptyFeedback = (props: Props) => {
  return (
  <div className=' flex justify-center'>  <div className=' w-32 '><EmptyFeedbackSvg/></div></div>
  )
}

export default TicketEmptyFeedback