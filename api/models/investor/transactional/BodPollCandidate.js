const { model, Schema, mongoose } = require("mongoose");

const BodPollCandidateSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MUser'
  },
  votes: {
    type: mongoose.Schema.Types.Object,
    ref: 'InvestorVotes'
  },
  isWinner: { type: Number },
  customVoteCount: { type: Number },
  pollDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PollDetails'
  },
  thumbnail: { type: String }
},
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = model("BodPollCandidate", BodPollCandidateSchema);
