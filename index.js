const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const bp = require('body-parser');
const PORT = process.env.PORT || 3001
const cookieParser = require('cookie-parser');


const dbConnection = require('./config/dbConnection');

const mainRoute = require('./routes/mainRoutes');
const authRoute = require('./routes/authRoutes');
const userRoute = require('./routes/userRoutes');
const subjectRoute = require('./routes/subjectRoutes');
const questionRoute = require('./routes/questionRouter')
const pastPaperRoute = require('./routes/pastPaperRoutes')


const { notFound, errorHandler } = require('./middleware/errorHandler');

dbConnection()

app.use(bp.json());
app.use(bp.urlencoded({extended: false}));

app.use(cookieParser());


app.use('/', mainRoute);
app.use('/api/user/', authRoute);
app.use('/api/user/', userRoute);
app.use('/api/subject', subjectRoute);
app.use('/api/past-paper', pastPaperRoute);
app.use('/api/question', questionRoute);


app.use(notFound)
app.use(errorHandler);

app.listen(PORT, () =>{
    console.log(`backend server is running at localhost:${PORT}`);
});