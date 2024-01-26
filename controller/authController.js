const { generateToken } = require('../config/jwtToken');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');



const createUser = asyncHandler(
    async (req, res) =>{
        const {email} = req.body;
    
        const findUser = await User.findOne({email: email});
        console.log(req.body)
        if(!findUser){
            //CREATE USER
            const newUser = User.create(req.body);
            res.json(newUser)
        }
        else{
            
            //User exists
            throw new Error('User Already Exists');
        }
    }    
);

const loginUser = asyncHandler(
    async (req, res) =>{
        const {email, password} = req.body;

        const findUser = await User.findOne({email: email});
        
        if(findUser && (await findUser.isPasswordMatched(password))){
            res.json({
                id: findUser?._id,
                name: findUser?.name,
                email: findUser?.email,
                token: generateToken(findUser?.id)
            })
        }else{
            throw new Error('Invalid Credentials')
        }
    }
);

module.exports = {createUser, loginUser};