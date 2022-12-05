const { model, Schema } = require("mongoose");

const departmentSchema = new Schema({
  // name: { type: String, default: null },
  // password: { type: String },
  name: { type: String, unique: true },
  description: { type: String, default: null },
},
{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = model("Department", departmentSchema);
