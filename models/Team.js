const mongoose = require('mongoose');
const Schema = mongoose.Schema;



//Create the Database schema for mongodb


const TeamSchema = new Schema({
    projectName: {
        type: String,
        required: true
    },
    Team: {
        type: String,
        required: true
    },
    data: {
        type:Date,
        default: Date.now
    }
});


module.exports = Team = mongoose.model('team',TeamSchema);