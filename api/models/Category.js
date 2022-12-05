const { model, Schema,mongoose } = require('mongoose');

const categorySchema = new Schema({
    name: String
    // ,
    // products: [{
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: 'Product'
    //     }]
      

});

module.exports = model('Category', categorySchema);