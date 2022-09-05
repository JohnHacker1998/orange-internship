const express=require('express')
const {registerAdmin,login}=require('../controllers/auth')
authRouter=express.Router();


authRouter.post('/register',registerAdmin)
authRouter.post('/login',login)


module.exports=authRouter