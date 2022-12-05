const { model, Schema, mongoose } = require("mongoose");

const NotificationSchema = new Schema({
    message: { type: String },
    tags: [{ type: String }],
    ticketTypes: [{ type: String }],
    views: [{type:  mongoose.Schema.Types.Object, ref: 'NotifView'}],
    path: { type: String },
    pathSuffix: { type: String, default: null},
    notifyAll: { type: Boolean },
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MUser'
    }],
    department: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department'
    }],
},
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = model("Notification", NotificationSchema);


// {
//     user: '6290c13b0bf11f290fdc1827',
//     viewDate: '2022-08-10 13:48:13'
//   }