const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var questionSchema = new mongoose.Schema({
    description:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    question_number:{
        type:String,
        required:true,
        unique:true,
    },
    img_url:{
        type:String,
        required:true,
        unique:true,
    },
    past_paper:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "PastPaper",
        required:true,
    },
},
{timestamps: true});

//Export the model
module.exports = mongoose.model('Question', questionSchema);