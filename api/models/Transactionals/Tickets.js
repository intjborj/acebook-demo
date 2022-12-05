const { model, Schema, mongoose } = require("mongoose");
const { MongooseFindByReference } = require('mongoose-find-by-reference');


const ticketSchema = new Schema({
    code: { type: String, unique: true },
    description: { type: String },
    // type: { type: mongoose.Schema.Types.ObjectId, refPath: "TiketType.code"},
    type: { type: String},
    typeId: {  type: mongoose.Schema.Types.ObjectId,
        ref: 'TicketType'},
    // type: { type: String, enum: ['EquipmentMaintenance', 'CCTVReview','HISClientConcern','HISDevelopmentRequest']},
    dateNeeded: { type: String },
    dateRequested: { type: String },
    subject: { type: String },
    status: { type: String, enum: ['draft', 'returned', 'pending','approved','disapproved','working','completed','success','failed','closed']},
    location: { type: String },
    remarks: { type: String },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MUser'
    },
    requestedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MUser'
    },
    serviceDepartment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department'
    },
    requestingDepartment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department'
    },
    comments: [{type:  mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
    asset: {type:  mongoose.Schema.Types.ObjectId, ref: 'Asset'},
    reactions:  [{type:  mongoose.Schema.Types.Object, ref: 'Reaction'}],
    postOrigin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    works: [{type:  mongoose.Schema.Types.ObjectId, ref: 'WorkDetail'}], 
    approvers:  [{type:  mongoose.Schema.Types.Object, ref: 'Approver'}],
    toDo:  [{type:  mongoose.Schema.Types.Object, ref: 'ToDo'}],
    clientFeedback:  {type:  mongoose.Schema.Types.Object, ref: 'ClientFeedback'},
    assignedPersonnel: [{type:  mongoose.Schema.Types.Object, ref: 'AssignedPersonnel'}],
    // approvers:  [{type:  mongoose.Schema.Types.Object, ref: 'Reaction'}],
    // attachments: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Attachment',
    //     default: null
    // }]
    attachments: [{
        type: mongoose.Schema.Types.Object,
        ref: 'StringAttachment',
        default: null
      }],
},
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);
ticketSchema.plugin(MongooseFindByReference);
module.exports = model("Ticket", ticketSchema);
