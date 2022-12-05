const { model, Schema, mongoose } = require("mongoose");
const { MongooseFindByReference } = require('mongoose-find-by-reference');

const userSchema = new Schema({
  username: { type: String, unique: true, default: null },
  firstName: { type: String },
  middleName: { type: String, default: null },
  nameExtension: { type: String, default: null },
  suffix: { type: String, default: null },
  lastName: { type: String },
  position: { type: String , default: null},
  isActive: { type: Boolean , default: true },
  isApprover: { type: Boolean , default: false },
  contact: { type: String, default: null  },
  email: { type: String, default: null},
  password: { type: String, default: null },
  profilePicture: { type: String, default: null },
  // role: {type : String , default: null},
  token: { type: String , default: null },
  departmentOnDuty:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department'
    , default: null
  },
  department:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department'
    , default: null
  }],
   restrictionCode: [{ type: String}],
   investorDetails:  {type:  mongoose.Schema.Types.Object, ref: 'InvestorDetails'},
   configurations:  {type:  mongoose.Schema.Types.Object, ref: 'UserConfiguration'},
},
{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);
userSchema.plugin(MongooseFindByReference);
module.exports = model("MUser", userSchema);
