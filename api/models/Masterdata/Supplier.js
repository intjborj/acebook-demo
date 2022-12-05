const { model, Schema } = require("mongoose");
const { MongooseFindByReference } = require('mongoose-find-by-reference');
const supplierSchema = new Schema({
  name: { type: String, unique: true },
  migrationId: { type: String },
  mobile: { type: String },
  email: { type: String },
  url: { type: String },
  information: { type: String },
  address: { type: String },
  contactPerson: { type: String },
  contactTelephone: { type: String },
  contactEmail: { type: String },
  isArchived: { type: Boolean }
},
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);
supplierSchema.plugin(MongooseFindByReference);
module.exports = model("Supplier", supplierSchema);
