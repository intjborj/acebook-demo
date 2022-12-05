const { model, Schema } = require("mongoose");

const reactionIconDetailSchema = new Schema({
    name: { type: String, unique: true },
    path: { type: String, default: null },
},
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = model("ReactionIconDetails", reactionIconDetailSchema);
