const { model, Schema, mongoose } = require("mongoose");

const PollDetailsSchema = new Schema({
    candidates: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BodPollCandidate'
    }],
    period: { type: String },
    isCurrentTerm : {type: Boolean, default: false},
    votingOpen : {type: Boolean, default: false}
},
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = model("PollDetails", PollDetailsSchema);
