import EmptyDataFolderSvg from '@/components/customs/information/emptyDataFolder'
import EmptyDeptSvg from '@/components/customs/information/emptyDepartment'
import EmptyPersonnelSvg from '@/components/customs/information/emptyPersonnel'
import React from 'react'

type Props = {}

const TicketEmptyDept = (props: Props) => {
  return (
  <div className=' flex justify-center'>  <div className=' w-32 '><EmptyDeptSvg/></div></div>
  )
}

export default TicketEmptyDept