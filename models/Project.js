const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create the Database schema for mongodb

const ProjectSchema = new Schema({
  user: {
    type : Schema.Types.ObjectId,
    ref: "users"
  },
  file: {
    type: String,
    ref: "uploads.files",
    
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
  address: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  budget: {
    type: String,
    required:true
  },
  size: {
    type: String,
    required: true
  },
  technologies: {
    type: [String],
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'available'
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

