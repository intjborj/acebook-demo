import { Injectable } from '@nestjs/common';
import { paginate } from '@/common/pagination/paginate';
import { PollDetailsEnt, PollDetailsEntView, PollResultEnt, PollResultResp } from './entities/pollDetails.entity';
import moment from 'moment';
// import  PollDetails  from './entities/pollDetails.entity';
import PollDetails from '@models/investor/transactional/PollDetails';
import BodPollCandidate from '@models/investor/transactional/BodPollCandidate';

import { PollDetailsId, UpsertPollDetailsInput } from './dto/pollDetails.input';
import { PaginationArgs } from '@/common/dto/pagination.args';
import _ from 'lodash'
import { PollPaginatorArg, VoteResultArg } from './dto/pollDetails.args';
import { votingProcess } from './services/voting';
import MUser from '@models/User';
import { votingResults } from './services/votingResults';
import CompanyConfig from '@models/investor/masterdata/CompanyConfiguration';
import { INVESTOR_ACCOUNT_FILTER } from '@/util/constants/investors';
import { PubSubInvPollResult, PubSubPollDetails } from './pollDetails.resolvers';
import { BOD_POLL_DETAILS_EN, BOD_POLL_RESULT_EN } from '@/acebook/constants/qgl_subscriptions/publishers';
import { BodPollCandidateEnt } from '../bodPollCandidate/entities/bodPollCandidate.entity';
import { GetAccArgs } from '@/users/dto/get-users.args';
import { objectFilterUsers } from '@/users/services/filters';
import { UserEntAB } from '@/users/entities/user.entity';

var ObjectId = require('mongoose').Types.ObjectId;
@Injectable()
export class PollDetailsService {
  async upsert(upsertInput: UpsertPollDetailsInput): Promise<PollDetailsEnt> {
    let savedData;

    let checking = await PollDetails.find({
      isCurrentTerm: true,
    })


    // if (checking.length == 0 && upsertInput.isCurrentTerm == true) {
    if (checking.length == 0 || (checking.length == 1 && checking[0]._id == upsertInput._id)) {
      savedData = pollUpsertProcessNew(upsertInput)
      // savedData = pollUpsertProcess(upsertInput)

      // const pollDetails: PollDetailsEntView[] = await PollDetails.find({isCurrentTerm : true})
      // .populate({ path: "candidates", populate: { path: "user", model: "MUser" } });


    }

    return savedData;
  }


  async voting(upsertInput: UpsertPollDetailsInput): Promise<PollDetailsEnt> {
    let savedData;



    let userDet = await MUser.findOne(
      { _id: upsertInput.userId }
    );

    let checkVoteHist = _.get(userDet, "investorDetails.votingHistory") ?? []

    if (!checkVoteHist.includes(upsertInput._id)) {

      if (votingProcess(upsertInput)) {
        savedData = await PollDetails.find({ _id: new ObjectId(upsertInput._id) })
      }

      let result = await votingResults({ _id: upsertInput._id as string })


      PubSubInvPollResult.publish(BOD_POLL_RESULT_EN,
        {
          subscBodPollResult: { data: result }
        }
      )

      return savedData[0];

    } else {
      return savedData;
    }

  }


  async delete(upsertInput: PollDetailsId): Promise<PollDetailsEnt> {
    let removedData = await PollDetails.findOneAndDelete({
      _id: upsertInput._id,
    });

    return removedData;
  }

  async findAll(payload: PollPaginatorArg) {
    let filter = payload._id ? { _id: payload._id } : {}
    const pollDetails: PollDetailsEntView[] = await PollDetails.find(filter)
      .populate({ path: "candidates", populate: { path: "user", model: "MUser" } });

    return {
      data: pollDetails,
      paginatorInfo: paginate(
        pollDetails.length,
        payload.page,
        payload.first,
        pollDetails.length,
      ),
    };
  }

  async getTotalVotes(payload: PollPaginatorArg) {
    const compConfig = await CompanyConfig.find();

    const result = await MUser.aggregate(
      [
        { $match: INVESTOR_ACCOUNT_FILTER }
        ,
        {
          $project: {
            votes: { $multiply: ["$investorDetails.blocks", parseInt(compConfig[0].investor.sharesPerBlock), parseInt(compConfig[0].investor.votesPerShare)] },

          }
        }
      ]
    );

    let totalVotes: number = 0;

    result.map((item: any) => {
      totalVotes += item.votes
    })


    return {
      totalVotes: totalVotes
    };
  }

  async viewVoteResults(payload: VoteResultArg) {

    let result = await votingResults(payload)

    return { data: result }
  }

  async getVoteReport(payload: GetAccArgs) {

    let filters = objectFilterUsers(payload as GetAccArgs);

  
    const compConfig: CompanyConfig[] = await CompanyConfig.find();
    

    const data: PollResultEnt[] = await MUser.aggregate(
      [
        {
          $match:
            filters
        },
        {
          $lookup: {
            from: "musers",
            localField: "_id",
            foreignField: "_id",
            as: "musers"
          }
        },
        {
          $project: {
            firstName: 1,
            middleName: 1,
            lastName: 1,
            investorDetails: 1,
            _id: 1, 
            shares: { $multiply: ["$investorDetails.blocks", parseInt(compConfig[0].investor.sharesPerBlock)] },
            votesAvailable: { $multiply: ["$investorDetails.blocks", parseInt(compConfig[0].investor.sharesPerBlock), parseInt(compConfig[0].investor.votesPerShare)] }
          }
        },
        {
          $lookup: {
            from: 'bodpollcandidates',
            let: { invId: "$_id" },
            pipeline: [
              {
                $match: {
                  $and: [
                    { pollDetails: new ObjectId(payload.id) },
                    { votes: { $ne: null } },
                    { votes: { $exists: true, $not: { $size: 0 } } },
                  ]
                }
              },
              {
                $project: {
                  user: 1,
                  votes: {
                    $filter: {
                      input: "$votes",
                      as: "vote",
                      cond: { $eq: ["$$vote.user", "$$invId"] }
                    }
                  }
                }
              }
            ],
            as: 'candidates'
          }
        },

      ])

      let popResult = await MUser.populate(data, {path: 'candidates.user'})

    return {
      data: popResult,
      paginatorInfo: paginate(data.length, payload.page, payload.first, data.length),
    };
  }


  async findCurrent(payload: PollPaginatorArg) {
    const pollDetails: PollDetailsEntView[] = await PollDetails.find({ isCurrentTerm: true })
      .populate({ path: "candidates", populate: { path: "user", model: "MUser" } });

    return {
      data: pollDetails,
      paginatorInfo: paginate(
        pollDetails.length,
        payload.page,
        payload.first,
        pollDetails.length,
      ),
    };
  }



}



async function pollUpsertProcess(upsertInput: UpsertPollDetailsInput) {
  let savedData;

  let arrCandidates = []
  if (upsertInput.candidates) {
    let bods = BodPollCandidate.insertMany(upsertInput.candidates)
    let resBods = await bods;
    arrCandidates = _.map(resBods, '_id')
  }

  if (upsertInput._id) {
    savedData = await PollDetails.findOneAndUpdate(
      { _id: upsertInput._id },
      {
        $set: {
          period: upsertInput.period,
          candidates: arrCandidates,
          isCurrentTerm: upsertInput.isCurrentTerm
        }
      },
      { new: true },
    );
  } else {

    savedData = new PollDetails({
      period: upsertInput.period,
      candidates: arrCandidates,
      isCurrentTerm: upsertInput.isCurrentTerm
    });
    await savedData.save();
  }

  return savedData
}


async function pollUpsertProcessNew(upsertInput: UpsertPollDetailsInput) {
  let savedDataInit;
  let savedData;
  let forInsertCandidates = upsertInput.candidates;
  let forEditCandidates;

  // === delete candidates that are removed on the list  === 

  if (upsertInput._id) {

    // === delete candidates that are removed on the list  === 
    let arrDeleteCandidates = upsertInput.candidates.map((item: any) => {
      return new ObjectId(item.user)
    })

    await BodPollCandidate.deleteMany({ pollDetails: new ObjectId(upsertInput._id), user: { $nin: arrDeleteCandidates } });
    // ========================================================

    //  === get users listed but not yet a candidate, array for insert ===
    forInsertCandidates = upsertInput.candidates.filter((item: any) => {
      return item.candidateId == null
    })

    // ========================================================

    //  === get users listed that are candidate, array for update ===
    forEditCandidates = upsertInput.candidates.filter((item: any) => {
      return item.candidateId != null
    })



    // ========================================================


    // UPDATE CANDIDATES ======
    forEditCandidates.map(async (item: any) => {
      await BodPollCandidate.findOneAndUpdate(
        { _id: item.candidateId },
        {
          $set: {
            customVoteCount: item.customVoteCount,
            thumbnail: item.thumbnail
          }
        }
      );
    })
    // UPDATE CANDIDATES ======


  }


  //  ==== upsert polldetails ====
  if (upsertInput._id) {
    //  ==== UPDATE ====
    savedDataInit = await PollDetails.findOneAndUpdate(
      { _id: upsertInput._id },
      {
        $set: {
          period: upsertInput.period,
          isCurrentTerm: upsertInput.isCurrentTerm,
          votingOpen: upsertInput.votingOpen
        }
      },
      { new: true },
    );


    PubSubPollDetails.publish(BOD_POLL_DETAILS_EN,
      {
        subscPollDetails: { data: [savedDataInit] }
      }
    )

  } else {
    //  ==== INSERT ====
    savedDataInit = new PollDetails({
      period: upsertInput.period,
      isCurrentTerm: upsertInput.isCurrentTerm,
      votingOpen: upsertInput.votingOpen
    });
    await savedDataInit.save();
    savedDataInit = await savedDataInit


    PubSubPollDetails.publish(BOD_POLL_DETAILS_EN,
      {
        subscPollDetails: { data: [savedDataInit] }
      }
    )


  }
  // ========================================================


  // === assign candidates on poll details ===

  let arrCandidates = []
  if (forInsertCandidates.length > 0) {

    // === Adding polldetails id on each candidate document, for easy acccess ===
    let modCandidates = forInsertCandidates.map((item: any) => {
      let dup = _.cloneDeep(item)
      dup.pollDetails = savedDataInit._id

      return dup
    })


    // === Insert candidates that are not yet listed ===


    let bods = BodPollCandidate.insertMany(_.uniqBy(modCandidates, 'user'))
    let resBods = await bods;
    // await validateAndInsertBOD(modCandidates, savedDataInit._id)


    // === Getting all candidates with the poll id and retrieve _id to be updated on polldetails candidates ===
    let newCandidates = await BodPollCandidate.find({ pollDetails: savedDataInit._id }, { new: true })
    arrCandidates = _.map(newCandidates, '_id')


    // Updating polldetails with the new sets of candidates
    savedData = await PollDetails.findOneAndUpdate(
      { _id: savedDataInit._id },
      { $set: { candidates: arrCandidates } },
      { new: true },
    );

  } else {
    savedData = savedDataInit
  }





  return savedData
}


async function validateAndInsertBOD(modCandidates: any, pollDetId: any) {
  let listedCandidates: BodPollCandidateEnt[] = await BodPollCandidate.find({ pollDetails: pollDetId })

  // console.log(listedCandidates)
  let getUserBod = _.map(listedCandidates, "user")
  console.log(modCandidates)
  console.log(getUserBod)
  if (listedCandidates) {
    modCandidates.map((item: any) => {
      let converted = new ObjectId(item.user)
      console.log(item.user)
      console.log(converted)
      console.log(_.includes(getUserBod, converted))
      if (_.includes(getUserBod, converted) == false) {
        BodPollCandidate.insertMany([item])
        // let bod = new BodPollCandidate(item)
        // let resBods = await bod;
      }
    })
  }

  // let bods = BodPollCandidate.insertMany(modCandidates)
  // let resBods = await bods;
}