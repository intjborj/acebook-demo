const { model, Schema, mongoose } = require("mongoose");

const investorConfigSchema = new Schema({
    sharesPerBlock: { type: Number },
    votesPerShare: { type: Number },
},
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = model("InvestorConfig", investorConfigSchema);
