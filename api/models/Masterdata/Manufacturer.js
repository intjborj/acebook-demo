const { model, Schema } = require("mongoose");
const { MongooseFindByReference } = require('mongoose-find-by-reference');
const manufacturerSchema = new Schema({
  name: { type: String, unique: true },
  mobile: { type: String },
  migrationId: { type: String },
  email: { type: String },
  url: { type: String },
  information: { type: String },
  isArchived: { type: Boolean }
},
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);
manufacturerSchema.plugin(MongooseFindByReference);
module.exports = model("Manufacturer", manufacturerSchema);
