
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

//Assign the MongoDB configuration Database url
const DB = process.env.DATABASE_URL;

//1. Connecting to MongoDB
var connections = mongoose.connect(DB)
const UserRouter = require('./routes/UserRoutes')
app.use(express.json()); // JSON Middleware 
app.use(cors({
    origin : "*"
}));

//Parent route
app.use('/api/auth', UserRouter);

app.all("*",(req,res,next)=>{
    res.status(400).json({
        status : "Fail",
        message : "Invalid request"

    })
    next();
})

app.listen(8000,async()=>
{  
    try {
        await connections ;
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
    }
    console.log(`Server running at http://127.0.0.1:${8000}`);
})