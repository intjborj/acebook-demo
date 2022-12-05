const { model, Schema, mongoose } = require("mongoose");

const UserConfigurationsSchema = new Schema({
    notification:  {type:  mongoose.Schema.Types.Object, ref: 'NotifConfig'},
},
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = model("UserConfiguration", UserConfigurationsSchema);
