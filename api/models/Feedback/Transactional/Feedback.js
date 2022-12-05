const { model, Schema, mongoose } = require("mongoose");

const FeedbackSchema = new Schema({
  category: {type:  mongoose.Schema.Types.Object, ref: 'FBCategory'},
  feedback:  [{type:  mongoose.Schema.Types.Object, ref: 'FeedbackDoc'}],
  remarks: { type: String, default: null },
},
{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = model("FeedbackQuestion", FeedbackSchema);
