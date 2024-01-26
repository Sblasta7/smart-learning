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

const findById = asyncHandler(
    async(req, res) =>{
        const id = req.params;

        const findUser = await User.findOne({_id:id});

        if(findUser){
            res.json(findUser)
        }else{
            throw new Error('Invalid Credentials')
        }
    }
);

const findAll = asyncHandler(
    async(req, res) =>{
        const id = req.params;

        const findUsers = await User.find();

        if(findUser){
            res.json(findUser)
        }else{
            throw new Error('No users found')
        }
    }
);

const updateUser = asyncHandler(
    async(req, res) =>{
        const id = req.params;

        const findUsers = await User.find();

        if(findUser){
            res.json(findUser)
        }else{
            throw new Error('No users found')
        }
    }
);

const deleteUser = asyncHandler(
    async(req, res) =>{
        const id = req.params;

        const findUsers = await User.find();

        if(findUser){
            res.json(findUser)
        }else{
            throw new Error('No users found')
        }
    }
);



module.exports = {createUser, loginUser, findById, findAll, updateUser, deleteUser};