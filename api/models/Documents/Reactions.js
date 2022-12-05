const { model, Schema, mongoose } = require("mongoose");

const reactionSchema = new Schema({
    reactionIcon: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ReactionIconDetails'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MUser'
    },
},
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = model("Reaction", reactionSchema);
