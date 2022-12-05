const { model, Schema, mongoose } = require("mongoose");

const notifViewSchema = new Schema({
     user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MUser'
    },
    viewDate: { type: String },
},
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = model("NotifView", notifViewSchema);
