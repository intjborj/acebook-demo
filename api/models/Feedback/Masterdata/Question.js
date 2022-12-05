const { model, Schema } = require("mongoose");

const FBQuestionSchema = new Schema({
  description: { type: String, default: null },
  question: { type: String, default: null },
},
{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = model("FBQuestion", FBQuestionSchema);
