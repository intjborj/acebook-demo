const { model, Schema, mongoose } = require("mongoose");

const restrictionSchema = new Schema({
  description: { type: String, default: null },
  code: { type: String, unique: true }, //use for identifier
  path: { type: String, default: "#" }, //use for identifier
  type: { type: String,  enum: ['page', 'function', 'both'] }, 
},
{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = model("Restriction", restrictionSchema);
