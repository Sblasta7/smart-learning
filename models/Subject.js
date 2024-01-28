const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var subjectSchema = new mongoose.Schema({
    description:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
},
{timestamps: true}
);

//Export the model
module.exports = mongoose.model('Subject', subjectSchema);