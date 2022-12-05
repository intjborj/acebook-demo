import BodPollCandidate from '@models/investor/transactional/BodPollCandidate';
import { VoteResultArg } from '../dto/pollDetails.args';
var ObjectId = require('mongoose').Types.ObjectId;

export async function votingResults(value: VoteResultArg) {

    const result = await BodPollCandidate.aggregate(
        [
            {
                $match:
                {
                    pollDetails: new ObjectId(value._id) 
                    // pollDetails: value._id
                }
            }
            ,
            {
                $project: {
                   _id:1,
                   user: 1,
                   thumbnail:1,
                   totalVotes:{
                       $cond :  {
                                    if: {
                                        $or: [ { $gte: [ "$customVoteCount", 0 ] }]
                                            // $or:
                                            //     [
                                            //         {$exists: ["$customVoteCount", true] },
                                            //         {$ne: ["$customVoteCount", null]}
                                            //     ]
                                            // $or: [
                                            //     { customVoteCount: null},
                                            //     { customVoteCount: { $exists: true, $size: 0 } },
                                            // ]
                                        },
                                    then: "$customVoteCount",
                                    else:  { $sum: "$votes.count"}
                                }
                               }
                   
                //    { $sum: "$votes.count"},

                }
            }
        ]
    );

    let popResult = await BodPollCandidate.populate(result, {path: 'user'})
  

    return popResult;
}

//  == 08-29-2022 ==
// export async function votingResults(value: VoteResultArg) {

//     const result = await BodPollCandidate.aggregate(
//         [
//             {
//                 $match:
//                 {
//                     pollDetails: new ObjectId(value._id) 
//                     // pollDetails: value._id
//                 }
//             }
//             ,
//             {
//                 $project: {
//                    _id:1,
//                    user: 1,
//                    totalVotes: { $sum: "$votes.count"},

//                 }
//             }
//         ]
//     );

//     let popResult = await BodPollCandidate.populate(result, {path: 'user'})
  

//     return popResult;
// }
//   == 08-29-2022 ==



// const result = await BodPollCandidate.aggregate(
//     [
//         {
//             $match:
//             {
//                 pollDetails:"63072ccf6a68d7d442899434"
//                 // pollDetails: value._id
//             }
//         }
//         // ,
//         // {
//         //     $project: {
//         //         created_at: 1,
//         //         message: 1,
//         //         path: 1,
//         //         views: {
//         //             $filter: {
//         //                 input: "$views",
//         //                 as: "view",
//         //                 cond: { $eq: ["$$view.user", new ObjectId(payload.userId)] }
//         //             }
//         //         },
//         //     }
//         // }
//     ]
// );