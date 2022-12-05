const { model, Schema, mongoose } = require("mongoose");

const approverSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MUser'
    },
    status: { type: String, enum: ['approved', 'disapprove', 'pending'] },
    updatedAt: { type: String },
},
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = model("Approver", approverSchema);
