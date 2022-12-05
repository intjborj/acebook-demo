import ImageView from '@/components/attachments/imageView';
import ImagePreview from '@/components/upload/previews/imagePreview';
import _ from 'lodash';
import React from 'react'
import { isMobile } from 'react-device-detect';
import { DEFAULT_POLL_IMAGE, viewPollImages } from '../../constants/pollImages';
import NumberInput from '../ui/numberInput';
import SpecCandidateLayout from './specCandidateLayout';

type Props = {
  data?: any;
  voted?: any;
  votesAvailable?: number;
  votesAvailableOrg?: number;
  reachLimit?: boolean;
  hasVoted?: boolean;
}

const PollCandidates = ({ data, voted, votesAvailable, votesAvailableOrg, reachLimit, hasVoted = false }: Props) => {

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
                  <ImageView className="w-20 h-20 rounded-full" src={item.thumbnail ?  viewPollImages(item.thumbnail) : DEFAULT_POLL_IMAGE}  />
                  {/* <img className="w-20 h-20 rounded-full" src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" alt="image description" /> */}
                </div>
                <div className='pl-4 pt-4'>
                  <div className=''>
                    <h1 className="text-md md:text-2xl font-bold dark:text-white ">
                      <div className='grid grid-cols-1 md:grid-cols-2'>
                        <div className=' capitalize'>{_.get(item, "user.firstName")} {_.get(item, "user.middleName")} {_.get(item, "user.lastName")} {_.get(item, "user.suffix")} </div>
                        <small className="md:ml-2 font-semibold text-gray-500 dark:text-gray-400">{_.get(item, "user.nameExtension") ? `, ${_.get(item, "user.nameExtension")}` : ""}</small>
                      </div>
                    </h1>

                    {hasVoted == false ? <div className='md:absolute right-2 bottom-8'>
                      <NumberInput
                        value={(e: number) => handChangeVote(item, e)}
                        votesAvailableOrg={votesAvailableOrg}
                        votesAvailable={votesAvailable}
                        defaultValue={item.vote}
                        reachLimit={reachLimit}
                      />
                    </div> : <></>}
                    
                  </div>
                </div>
              </>
            </SpecCandidateLayout>
          </div>
        ))
      }

    </div>
  )
}

export default PollCandidates