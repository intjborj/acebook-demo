const { model, Schema } = require("mongoose");

const promotionsSchema = new Schema({
  path: { type: String, unique: true },
  type: { type: String},
},
{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = model("Promotion", promotionsSchema);
