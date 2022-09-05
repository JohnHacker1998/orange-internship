const Admin=require('../models/Admins')
const Employee=require('../models/Employees')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const {createError}=require('../utils/error')
require('dotenv').config()

const registerAdmin=async(req,res,next)=>{
try{
    const salt=bcrypt.genSaltSync(10)
    const hash=bcrypt.hashSync(req.body.password,salt)
    
    const newAdmin=new Admin({
        ...req.body,
        password:hash
    })
    await newAdmin.save()
    res.status(200).json({
        "message":"Admin registered successfully"
    })
}
catch(err){
next(err)
}

}
const login=async(req,res,next)=>{
    try{
        const admin=await Admin.findOne({'username':req.body.username})
        const employee=await Employee.findOne({'username':req.body.username})

        if(!admin && !employee)
        return createError(404,"User not found")
        if(admin){
            const isPasswordCorrect=await bcrypt.compare(req.body.password,admin.password) 
            if(!isPasswordCorrect)
             return createError(400,"Username or Password is incorrect")
             const token=jwt.sign({
                id:admin._id,role:"admin"
            },process.env.JWT_KEY)
            res.cookie('access-token',token,{
                httpOnly:true
            }).status(200).json({
                details:admin.email
            })

        }
        else if(employee){
            const isPasswordCorrect=await bcrypt.compare(req.body.password,employee.password) 
            if(!isPasswordCorrect)
             return createError(400,"Username or Password is incorrect")
             const token=jwt.sign({
                id:employee._id,role:"employee"
            },process.env.JWT_KEY)
            res.cookie('access-token',token,{
                httpOnly:true
            }).status(200).json({
                details:employee.email
            })
        }
        
     
    }
    catch(err){
        next(err)
    }
}

module.exports={registerAdmin,login}