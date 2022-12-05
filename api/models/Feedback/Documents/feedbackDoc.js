const { model, Schema, mongoose } = require("mongoose");

const feedbackSchema = new Schema({
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FBQuestion'
    },
    answer: { type: String, enum: ['dislike', 'like'] }
},
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = model("FeedbackDoc", feedbackSchema);
