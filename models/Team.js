const mongoose = require('mongoose');
const Schema = mongoose.Schema;



//Create the Database schema for mongodb


const TeamSchema = new Schema({
    user: {
        type : Schema.Types.ObjectId,
        ref: "users"
      },
    projectName: {
        type: String,
        required: true
    },
    team: {
        type: String,
        required: true
    },
    data: {
        type:Date,
        default: Date.now
    }
});


module.exports = Team = mongoose.model('team',TeamSchema);