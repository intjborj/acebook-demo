const { model, Schema, mongoose } = require("mongoose");
const { MongooseFindByReference } = require('mongoose-find-by-reference');
const WorkDetailSchema = new Schema({
  attachments: [{
    type: mongoose.Schema.Types.Object,
    ref: 'StringAttachment',
    default: null
  }],
  // attachments: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Attachment',
  //   default: null
  // }],
  code: { type: String, unique: true },
  dateTimeStarted: { type: String },
  dateTimeFinished: { type: String },
  laborCost: { type: Number },
  materialCost: { type: Number },
  descActualWorkDone: { type: String },
  equipmentStatus: { type: String, enum: ['fucntional', 'not_fucntional'] },
  workStatus: { type: String, enum: ['draft','completed', 'not_completed'] },
  workCategory: { type: String},
  findings: { type: String },
  recommNeeded: { type: String },
  actionNeeded: { type: String },
  materialRemarks: { type: String },
  archiveRemarks: { type: String },
  ticket: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MUser'
  },
  performedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MUser'
  }],
  reviewedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MUser'
  }],
  assetVariation: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AssetVariation'
  }],
  comments: [{type:  mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
  submissionDepartment: [{type:  mongoose.Schema.Types.Object, ref: 'SubmissionDepartment'}],
  item: { type: String },//temp
  materials: { type: String },//temp
  isArchived: { type: Boolean },//temp
},
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);
WorkDetailSchema.plugin(MongooseFindByReference);
module.exports = model("WorkDetail", WorkDetailSchema);
