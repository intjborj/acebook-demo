const { model, Schema, mongoose } = require("mongoose");

const productSchema = new Schema({

  title: String,
  description: String,
  supplier: String,
  slug: {
    type: String,
    required: false,
  },
  price: {
    type: String,
    required: false,
  },
  category: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }]


});

module.exports = model("Product", productSchema);
