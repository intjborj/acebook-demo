const { model, Schema, mongoose } = require("mongoose");

const investorVotesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MUser'
    },
    count: { type: Number },
  
},
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = model("InvestorVotes", investorVotesSchema);
