const { model, Schema, mongoose } = require("mongoose");

const investorDetailsSchema = new Schema({
    isEmployee: { type: Boolean, default: false },
    blocks: { type: Number, default: 1 },
    investorId: { type: String },
    votingHistory:  [{type:  mongoose.Schema.Types.ObjectId, ref: 'PollDetails'}],
},
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = model("InvestorDetails", investorDetailsSchema);
