const { model, Schema, mongoose } = require("mongoose");

const toDoSchema = new Schema({
    description: { type: String },
    updatedAt: { type: String },
},
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = model("ToDo", toDoSchema);
