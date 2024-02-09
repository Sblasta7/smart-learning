const User = require('../models/User');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const authMiddleware = asyncHandler(
    async (req, res, next) =>{
        let token;
        if (req?.headers?.cookie){
            const cookieArray = req.headers.cookie.split(';');
            const tokenCookie = cookieArray.find(cookie => cookie.trim().startsWith('refreshToken='));

            if (tokenCookie) {
                token = tokenCookie.split('=')[1];
            }
        
        //let token;
        // if (req?.headers?.authorization?.startsWith('Bearer')) {
        //     token = req.headers.authorization.split(' ')[1];


            try {
                if(token){
                    const decoded = jwt.verify(token, process.env.JWT_SEC);
                    
                    const user = await User.findById(decoded?.id);
                    req.user = user;

                    next();
                }
            } catch (error) {
                
                throw new Error('Not Authorized, token expired pls login again')
            }
        }else{
            console.log(req.headers);
            throw new Error('There is no token attached to header')
        }
    }
);

const isAdmin = asyncHandler(
    async (req, res, next) =>{
        console.log(req.user)
        const {email} = req.user;

        const adminUser = await User.findOne({email});

        if (adminUser.role !== 'admin') {
            throw new Error("You are not an admin");
        }else{
            next();
        }
    }
)

module.exports = {authMiddleware, isAdmin};