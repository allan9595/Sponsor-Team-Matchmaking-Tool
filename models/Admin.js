const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create the Database schema for mongodb

const AdminSchema = new Schema({
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
  reset_password_token: {
    type: String
  },
  reset_password_expires: {
    type: Date
  },
  created: {
    type: Date,
    default: Date.now
  },
  data: {
    type:Date,
    default: Date.now
  }
});

module.exports = Admin = mongoose.model('admin',AdminSchema);