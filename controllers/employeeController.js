const mongoose = require("mongoose");
const Employee=require('../models/Employees')
const {createError}=require('../utils/error')
const bcrypt=require('bcrypt');



const updateProfile=async(req,res,next)=>{
    try{
        let employee=await Employee.findOne(req.params.id)
        if(!employee)
        return createError('404',"Employee not found")
        const salt=bcrypt.genSaltSync(10)
        const hash=bcrypt.hashSync(req.body.password,salt)
        req.body.password=hash
        employee=req.body
        await employee.save()
        res.status(200).json({
            "message":"Profile Updated Successfully",
            "employee":employee
        })        
    }
    catch(err){
        next(err)
    }
}

module.exports=updateProfile