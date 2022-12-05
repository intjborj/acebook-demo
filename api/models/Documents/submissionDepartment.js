const { model, Schema, mongoose } = require("mongoose");

const submissionDeptSchema = new Schema({
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department'
    },
    status: { type: String, enum: ['approved', 'disapprove', 'pending', 'received'] },
    updatedAt: { type: String },
},
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = model("SubmissionDepartment", submissionDeptSchema);
