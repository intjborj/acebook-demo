const { model, Schema, mongoose } = require("mongoose");
const { MongooseFindByReference } = require('mongoose-find-by-reference');
const assetSchema = new Schema({
  name: { type: String, unique: true },
  description: { type: String },
  model: { type: String },
  migrationId: { type: String },
  prefix: { type: String },
  count: { type: String },
  assetVariation: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AssetVariation',
  }],
  handlingDepartment: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
  }],
  isArchived: { type: Boolean }

},
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);
assetSchema.plugin(MongooseFindByReference);
module.exports = model("Asset", assetSchema);
