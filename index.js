require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const adminRouter=require('./routes/adminRouter')
const employeeRouter=require('./routes/employeeRouter')
const authRouter=require('./routes/authRouter')
const cookieParser=require('cookie-parser')

mongoose.connect('mongodb://127.0.0.1:27017/orangedb', { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log("Connected to database!!"))

app.use(cookieParser())
app.use(express.json())

app.use('/auth',authRouter)
app.use('/admin',adminRouter)
app.use('/employee',employeeRouter)

app.use((err,req,res,next)=>{
    const errorStatus=err.status || 500;
    const errorMessage=err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
      });  


})

app.listen(3000, () => console.log("server started"));