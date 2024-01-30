const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var pastPaperSchema = new mongoose.Schema({
    description:{
        type:String,
        required:true,
        index:true,
    },
    year:{
        type:String,
        required:true,
    },
    grade:{
        type:Number,
        required:true,
    },
    file_url:{
        type:String,
        required: true,
        unique:true
    },
    subject:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Subject",
        required:true,
    },
},
{timestamps: true});

//Export the model
module.exports = mongoose.model('PastPaper', pastPaperSchema);