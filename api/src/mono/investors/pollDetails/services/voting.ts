import { UpsertPollDetailsInput } from "../dto/pollDetails.input";
import { PollCandidateInputEnt } from "../entities/pollCandidates.entity";
import BodPollCandidate from '@models/investor/transactional/BodPollCandidate';
var ObjectId = require('mongoose').Types.ObjectId;
import MUser from '@models/User';

export async function votingProcess(upsertInput: UpsertPollDetailsInput) {



    if (upsertInput.candidates) {
        upsertInput.candidates.map(async (item: PollCandidateInputEnt) => {

            let payloadVote = {
                user: new ObjectId(upsertInput.userId),
                count: item.votes.count
            }


            if (item.votes.count && item.votes.count > 0) {
                let updated = await BodPollCandidate.findOneAndUpdate(
                    { _id: item._id },
                    { $push: { votes: payloadVote } },
                    { new: true },
                );
            }
            // checker = Object.keys(updated).length === 0 ? false : true

        })


        if(upsertInput.userId){
            await MUser.findOneAndUpdate(
                 { _id: upsertInput.userId},
                 { $push: { "investorDetails.votingHistory": upsertInput._id } },
                 { new: true },
             );
         }


    }

    return true

}