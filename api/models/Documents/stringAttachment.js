const { model, Schema } = require("mongoose");

const stringAttachmentSchema = new Schema({
    type: { type: String, enum: ['image', 'file', 'video'] },
    path: { type: String, default: null },
},
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = model("StringAttachment", stringAttachmentSchema);
