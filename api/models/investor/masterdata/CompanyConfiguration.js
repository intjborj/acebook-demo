const { model, Schema, mongoose } = require("mongoose");

const CompanyConfigSchema = new Schema({
  investor: {type:  mongoose.Schema.Types.Object, ref: 'InvestorConfig'},
},
{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = model("CompanyConfig", CompanyConfigSchema);
