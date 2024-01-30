const { generateToken } = require('../config/jwtToken');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const { generateRefreshToken } = require('../config/refreshtoken'); 
const jwt = require('jsonwebtoken');


            

const createUser = asyncHandler(
    async (req, res) =>{
        const {email} = req.body;
    
        const findUser = await User.findOne({email: email});
        console.log(req.body)
        if(!findUser){
            //CREATE USER
            const newUser = await User.create(req.body);
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
            const refreshToken = await generateRefreshToken(findUser?._id);
 
            const updateuser = await User.findByIdAndUpdate(
                findUser.id, 
                {
                    refreshToken:refreshToken
                }, 
                {
                    new: true
                }
            );

            
            res.cookie(
                "refreshToken",
                refreshToken,
                {
                    httpOnly: true,
                    maxAge: 72 * 60 * 60 * 1000
                }
            );

            res.json({
                id: findUser?._id,
                name: findUser?.name,
                email: findUser?.email,
                token: await generateToken(findUser?.id),

            });
            
        }else{
            throw new Error('Invalid Credentials')
        }
    }
);

const handleRefreshToken = asyncHandler(
    async (req, res) =>{
        const cookie = req.cookies;
        console.log(cookie);

        if(!cookie?.refreshToken) throw new Error('No Refresh Token in Cookies');

        const refreshToken = cookie.refreshToken;

        console.log(refreshToken);

        const user = await User.findOne({refreshToken});

        if (!user) throw new Error('no refresh token present in db')
        
        jwt.verify(refreshToken, process.env.JWT_SEC, 
            (err, decoded) =>{
                if (err || user.id !== decoded.id){
                    throw new Error('there is something wrong with refresh token')
                }
                const accessToken = generateToken(user?.id);

                res.json({accessToken});
            }
            );
        
        
    }
);

const logout = asyncHandler(
    async (req, res) => {
        const cookie = req.cookies;
        console.log(cookie);
  
        if (!cookie?.refreshToken) throw new Error('No Refresh Token in Cookies');
  
        const refreshToken = cookie.refreshToken;
  
        console.log(refreshToken);
  
        const user = await User.findOne({ refreshToken });
  
        if (!user) {
            res.clearCookie(
            "refreshToken",
            {
                httpOnly: true,
                secure: true
            }
        );
        return res.sendStatus(204); // Send status without response body
        }
  
        await User.findOneAndUpdate(
            { 
                refreshToken: refreshToken }, 
            { 
                refreshToken: "" 
            }
        );
  
        res.clearCookie(
            "refreshToken",
            {
                httpOnly: true,
                secure: true
            }
        );
        return res.sendStatus(204);
    }
  );
  
 
  


module.exports = {createUser, loginUser, handleRefreshToken, logout};