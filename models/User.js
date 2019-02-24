const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create the Database schema for mongodb

const UserSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  data: {
    type:Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('users',UserSchema);
