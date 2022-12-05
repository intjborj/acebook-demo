const { model, Schema, mongoose } = require("mongoose");
const { MongooseFindByReference } = require('mongoose-find-by-reference');
const assetVariationSchema = new Schema({
  serialNo: { type: String },
  propertyCode: { type: String },
  model: { type: String },
  migrationId: { type: String },
  manufacturerMID: { type: String },
  supplierMID: { type: String },
  departmentMID: { type: String },
  locationMID: { type: String },
  inpsectedByMID: { type: String },
  typeMID: { type: String },
  cost: { type: Number },
  condition: { type: String },
  ipms: { type: String },
  description: { type: String },
  deployedDate: { type: String },
  asset: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Asset',
  },
  manufacturer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Manufacturer',
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
  },
  isArchived: { type: Boolean }
},
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);
assetVariationSchema.plugin(MongooseFindByReference);
module.exports = model("AssetVariation", assetVariationSchema);
