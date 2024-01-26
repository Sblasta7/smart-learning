const mongoose = require('mongoose');
const mongodbURL = process.env.MONGODB;
const dbConnection = () =>{
    try {
        const conn = mongoose.connect(mongodbURL)
        console.log('db connected successfully')
    } catch (error) { 
        throw new Error(error)
    }
};

module.exports = dbConnection;