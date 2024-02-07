const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt');
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        index:true,
    }, 
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:'user',
    },
    isBlocked:{
        type: Boolean,
        default: false
    },
    refreshToken:{
        type:String,
    }
},
{timestamps: true});

userSchema.pre('save', async function(next) { 
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.isPasswordMatched = async function (enteredPasswprd){
    return await bcrypt.compare(enteredPasswprd, this.password);
}

//Export the model
module.exports = mongoose.model('User', userSchema);