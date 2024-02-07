const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const bp = require('body-parser');
const PORT = process.env.PORT || 3001
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const flash = require('connect-flash');
 
// db connection import
const dbConnection = require('./config/dbConnection');


// route calls
const mainRoute = require('./routes/mainRoutes');
const authRoute = require('./routes/authRoutes');
const userRoute = require('./routes/userRoutes');
const subjectRoute = require('./routes/subjectRoutes');
const questionRoute = require('./routes/questionRoute')
const pastPaperRoute = require('./routes/pastPaperRoutes')


const { notFound, errorHandler } = require('./middleware/errorHandler');

dbConnection()

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));  

app.use(bp.json());
app.use(bp.urlencoded({extended: true}));

app.use(cookieParser());
app.use(methodOverride('_method')); 
app.use(express.urlencoded({ extended: true }));
app.use(flash());
  

app.use('/', mainRoute);
app.use('/api/auth/', authRoute);
app.use('/api/user/', userRoute);
app.use('/api/subject/', subjectRoute);
app.use('/api/past-paper/', pastPaperRoute);
app.use('/api/question/', questionRoute);


app.use(notFound)
app.use(errorHandler);

app.listen(PORT, () =>{
    console.log(`backend server is running at localhost:${PORT}`);
});