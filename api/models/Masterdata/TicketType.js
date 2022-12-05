const { model, Schema, mongoose } = require("mongoose");

const ticketTypeSchema = new Schema({
  name: { type: String, unique: true },
  code: { type: String, unique: true },
  codePrefix: { type: String, unique: true },
  isDisabled: { type: Boolean, default: false },
  approvers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MUser',
    default: null
  }],
  assignments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MUser',
    default: null
  }],
  submissionDepartment: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    default: null
  }],
  serviceDepartment: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    default: null
  }],
  addWorkWOAssignedP: { type: Boolean },
  addWorkWOApprovers: { type: Boolean },
},
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = model("TicketType", ticketTypeSchema);
