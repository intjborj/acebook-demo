const { model, Schema, mongoose } = require("mongoose");

const postSchema = new Schema({
    content: { type: String },
    attachments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attachment',
        default: null
    }],
    comments: [{type:  mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
    reactions:  [{type:  mongoose.Schema.Types.Object, ref: 'Reaction'}],
    isShared: { type: Boolean },
    sharedPost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        default: null
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MUser'
    },
    createdByDepartment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department'
    },
    ticket: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket'
    },
    taggedDepartments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        default: null
    }],
    taggedUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MUser',
        default: null
    }],
    privacy: { type: String, enum: ['Public', 'OwnDepartment', 'TaggedDepartments', 'OnlyMe', 'TaggedUsers']},
    customTags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CustomTag',
        default: null
    }],
    isArchived: { type: Boolean },//temp

},
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = model("Post", postSchema);
