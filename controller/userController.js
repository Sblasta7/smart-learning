const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const validateMongodbId = require('../utils/validateMongodbid');
validateMongodbId 

const findById = asyncHandler(
    async(req, res) =>{
        const {id} = req.params;
        try {
            console.log(id);
            const findUser = await User.findById(id);

            res.json(findUser)
            
        } catch (error) {
            throw new Error(error)
        
        }
    }
);

const getAllUsers = asyncHandler(
    async(req, res) =>{
        
        try {
            const getUsers = await User.find();

            if(getUsers){
                res.json(getUsers)
            }else{
                throw new Error('No users found')
            }
        } catch (error) {
            throw new Error(error)
        }
    }
);

const updateUser = asyncHandler(
    async(req, res) =>{
        const {id} = req.user;
        validateMongodbId(id);
        try {
            const findUser = await User.findByIdAndUpdate(id, 
                {
                    email:req?.body?.email,
                },
                {new: true}
            );

            res.json(findUser);
        } catch (error) {
            throw new Error(error);
        }
        
    }
);

const deleteUser = asyncHandler(
    async(req, res) =>{
        const {id} = req.user;

        validateMongodbId(id);
        try {
            
            const findUser = await User.findByIdAndDelete(id);

            if(findUser){
                res.json(findUser)
            }else{
                throw new Error('No users found')
            }
        } catch (error) {
            
        }
    }
);


const blockUser = asyncHandler(
    async(req, res) =>{
        const {id} = req.params;
        validateMongodbId(id);
        try{
            const block = await User.findByIdAndUpdate(
                id, 
                {
                    isBlocked:true
                },
                {
                    new: true,
                }
            );

            res.json({
                "message": "User blocked"
            });
        }catch(err){
            throw new Error(err)
        }
    }
);

const unBlockUser = asyncHandler(
    async(req, res) =>{
        const {id} = req.params;
        validateMongodbId(id);
        try{
            const unBlock = await User.findByIdAndUpdate(
                id, 
                {
                    isBlocked:false
                },
                {
                    new: true,
                }
            );

            res.json({
                "message": "User unblocked"
            });
        }catch(err){
            throw new Error(err)
        }
    }
)


module.exports = {findById, getAllUsers, updateUser, deleteUser, blockUser, unBlockUser};