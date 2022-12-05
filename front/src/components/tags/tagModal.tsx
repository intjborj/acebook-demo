import React from 'react'
import BorderDashedNc from '../ui/borderNc'

type Props = {
  data: string[]
}

const TagModal = ({ data }: Props) => {

  return (
    <div className='bg-white pt-2 pb-2 rounded-md'>
      {
        data && data.map((item, index: number) => (
          <div key={index}>
            <span className='p-5'>{item}</span>
            {data.length != (index + 1) ? <BorderDashedNc /> : <></>}
          </div>
        ))
      }
      {/* <span className='p-5'>TagModal</span>
      <BorderDashedNc />
      <span className='p-5'>TagModal</span>
      <BorderDashedNc />
      <span className='p-5'>TagModal</span> */}
    </div>
  )
}

export default TagModal