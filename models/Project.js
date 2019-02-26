const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create the Database schema for mongodb

const ProjectSchema = new Schema({
  user: {
    type : Schema.Types.ObjectId,
    ref: 'users'
  },
  email:{
    type: String,
    required: true
  },
  projectName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  Address: {
    type: String,
    required: true
  },
  Duration: {
    type: String,
    required: true
  },
  Budget: {
    type: String,
    required:true
  },
  Size: {
    type: String,
    required: true
  },
  Description: {
    type: String,
    required: true,
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  data: {
    type:Date,
    default: Date.now
  }
});

module.exports = Project = mongoose.model('project',ProjectSchema);

