import ImageView from '@/components/attachments/imageView';
import _ from 'lodash';
import React from 'react'
import SpecCandidateLayout from '../poll/components/candidates/specCandidateLayout'
import { DEFAULT_POLL_IMAGE, viewPollImages } from '../poll/constants/pollImages';
import PollProgressBar from './pollProgressBar';

type Props = {
    data?: any;
    totalVotesRef: number;
}

const ResultCandidates = ({ data, totalVotesRef }: Props) => {

    let calcPerc = (data.totalVotes / totalVotesRef) * 100
    let votePercent = parseFloat(calcPerc.toString()).toFixed(2)
    return (


        <SpecCandidateLayout>

            <div className='w-[40%] md:w-[15%] relative  justify-center grid  content-center'>
                <ImageView className="drop-shadow-lg w-[5rem] h-[5rem] md:w-[5rem] md:h-[5rem] rounded-full" src={data.thumbnail ?  viewPollImages(data.thumbnail) : DEFAULT_POLL_IMAGE} />
                {/* <ImageView className="drop-shadow-lg w-[4.5rem] h-[4.5rem] md:w-[5rem] md:h-[5rem] rounded-full" src={data.thumbnail ?  viewPollImages(data.thumbnail) : DEFAULT_POLL_IMAGE} /> */}
           
           
                {/* <ImageView className="w-20 h-20 rounded-full" src={data.thumbnail ?  viewPollImages(data.thumbnail) : DEFAULT_POLL_IMAGE} /> */}
                {/* <img className="drop-shadow-lg w-[4.5rem] h-[4.5rem] md:w-[5rem] md:h-[5rem] rounded-full" src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" alt="image description" /> */}
            </div>
            <div className='pl-4 pt-4 w-full'>
                <div className=''>
                    <h1 className="text-md md:text-xl font-bold dark:text-white ">
                        <div className='grid grid-cols-1 w-fit md:grid-cols-2'>
                            <div className=' capitalize'>{_.get(data, "user.firstName")} {_.get(data, "user.middleName")} {_.get(data, "user.lastName")} {_.get(data, "user.suffix")} </div>
                            <small className="md:ml-2 font-semibold text-gray-500 dark:text-gray-400">{_.get(data, "user.nameExtension") ? `, ${_.get(data, "user.nameExtension")}` : ""}</small>
                        </div>
                    </h1>
                    <PollProgressBar value={votePercent} />
                </div>

            </div>



        </SpecCandidateLayout>

    )
}

export default ResultCandidates