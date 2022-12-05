const { model, Schema, mongoose } = require("mongoose");

const clientFeedbackSchema = new Schema({
    reactionIcon: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ReactionIconDetails'
    },
    // reaction: { type: String },
    message: { type: String },
    updatedAt: { type: String },
},
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = model("ClientFeedback", clientFeedbackSchema);
