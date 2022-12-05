const { model, Schema, mongoose } = require("mongoose");

const NotifConfigSchema = new Schema({
    isEnabled: { type: Boolean },
    ringtone: { type: String },
},
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = model("NotifConfig", NotifConfigSchema);
