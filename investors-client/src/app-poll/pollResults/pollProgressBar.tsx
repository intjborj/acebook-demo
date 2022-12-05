import React from 'react'
import { isMobile } from 'react-device-detect';

type Props = {
  value: any;
}

const PollProgressBar = ({ value }: Props) => {
  // let barWidth = `w-[13%]`
  let barWidth = `w-[${value as string}%]`

  return (
    <div>
      {/* <div className="bg-white p-8 shadow-lg shadow-slate-200 rounded-lg w-full md:w-2/3 lg:w-1/3"> */}

      <div className="rounded w-full bg-slate-100 h-9 ">
        <div style={{ width: `${value}%` }} className={`font-bold text-white  drop-shadow-lg bg-indigo-400 h-9 rounded mt-3 grid justify-center content-center`} >
          {
            isMobile ?
              <>
               { value< 30 ?<></> : <> {value} %</>}
              </> :
              <>
               { value< 13?<></> : <> {value} %</>}
              </>

          }
        </div>
      </div>
      {/* </div> */}
    </div >
  )
}

export default PollProgressBar