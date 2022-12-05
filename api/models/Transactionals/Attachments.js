const { model, Schema, mongoose } = require("mongoose");
const attachmentsSchema = new Schema({
    path: { type: String },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MUser'
    },
    comments:[ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    refId: { type: mongoose.Schema.Types.ObjectId },
    type: { type: String, enum: ['image', 'file', 'video'] },
    originCollection: { type: String },
    reactions: [{type:  mongoose.Schema.Types.Object, ref: 'Reaction'}],
    customTags: [{type:  mongoose.Schema.Types.Object, ref: 'CustomTag'}]
},
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = model("Attachment", attachmentsSchema);
