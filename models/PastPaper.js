const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var pastPaperSchema = new mongoose.Schema({
    description:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    date:{
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
    subject_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Subject",
        required:true,
    },
});

//Export the model
module.exports = mongoose.model('PastPaper', pastPaperSchema);