import _ from 'lodash';
import React from 'react'
import { isMobile } from 'react-device-detect';
import NumberInput from '../ui/numberInput';
import SpecCandidateLayout from './specCandidateLayout';

type Props = {
  data?: any;
  voted?: any;
  votesAvailable?: number;
  votesAvailableOrg?: number;
  reachLimit?: boolean;
}

const PollCandidates = ({ data, voted, votesAvailable, votesAvailableOrg, reachLimit }: Props) => {

  const handChangeVote = (candidate: any, vote: number) => {

    if (voted) {
      voted({
        candidate: candidate,
        vote: vote
      })
    }
  }
 

  return (
    <div className=' grid-cols-1'>
      <div className="inline-flex justify-center items-center w-full">
        <hr className="my-8 w-64 h-px bg-gray-200 border-0 dark:bg-gray-700" />
        <span className="absolute left-1/2 px-3 font-medium text-gray-900 bg-white -translate-x-1/2 dark:text-white dark:bg-gray-900">Candidates</span>
      </div>
      {
        data && data.map((item: any) => (
          <div>
            <SpecCandidateLayout>

              <>
                <div>
                  <img className="w-20 h-20 rounded-full" src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" alt="image description" />
                </div>
                <div className='pl-4 pt-4'>
                  <div className=''>
                    <h1 className="text-md md:text-2xl font-bold dark:text-white ">
                      <div className='grid grid-cols-1 md:grid-cols-2'>
                        <div>{item?.user?.firstName}, {item?.user?.lastName}</div>
                        <small className="md:ml-2 font-semibold text-gray-500 dark:text-gray-400">MD, FPS, MhaD</small>
                      </div>
                    </h1>
                    {/* {isMobile ?
                      <div className='md:absolute right-2 bottom-5'>
                        <input type="number" id="visitors" className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Votes" />
                      </div> : <></>
                    } */}
                    {/* <div className='flex justify-center'> */}
                    <div className='md:absolute right-2 bottom-8'>
                      <NumberInput
                        value={(e: number) => handChangeVote(item, e)}
                        votesAvailableOrg={votesAvailableOrg}
                        votesAvailable={votesAvailable}
                        defaultValue={item.vote}
                        reachLimit={reachLimit}
                      />
                    </div>
                    {/* </div> */}

                  </div>
                </div>
                {/* <h1 className="text-xl font-extrabold dark:text-white">
                  <div className='grid-container grid grid-cols-2'>
                    <div className=' w-fit'>
                      <img className="w-20 h-20 rounded-full" src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" alt="image description" />
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2'>
                      <div>{item?.user?.firstName}, {item?.user?.lastName}</div>
                      <small className="ml-2 font-semibold text-gray-500 dark:text-gray-400">MD, FPS, MhaD</small>
                    </div>
                  </div>
                </h1> */}
              </>
            </SpecCandidateLayout>
          </div>
        ))
      }

    </div>
  )
}

export default PollCandidates