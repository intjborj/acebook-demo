const { model, Schema, mongoose } = require("mongoose");

const assignedPersonnelSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MUser'
    },
    // received: { type: Boolean, default: false },
    receivedAt: { type: String, default: null},
},
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = model("AssignedPersonnel", assignedPersonnelSchema);
