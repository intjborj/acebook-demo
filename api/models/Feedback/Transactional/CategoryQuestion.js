const { model, Schema, mongoose } = require("mongoose");

const FBCategoryQuestionSchema = new Schema({
  category: {type:  mongoose.Schema.Types.Object, ref: 'FBCategory'},
  questions: [{type:  mongoose.Schema.Types.Object, ref: 'FBQuestion'}]
},
{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = model("FBCategoryQuestion", FBCategoryQuestionSchema);
