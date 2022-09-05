const mongoose = require("mongoose");
const Employee=require('../models/Employees')
const Admin=require('../models/Admins')
const {createError}=require('../utils/error')
const bcrypt=require('bcrypt');

const addEmployee = async(req, res,next) => {
    const salt=bcrypt.genSaltSync(10)
    const hash=bcrypt.hashSync(req.body.password,salt)
    const employee = new Employee({
        email: req.body.email,
        last_name: req.body.last_name,
        first_name: req.body.first_name,
        gender:req.body.gender,
        date_of_birth:req.body.date_of_birth,
        phone_number:req.body.phone_number,
        address:req.body.address,
        password:hash

    });
    try {
        const newEmployee = await Employee.save();
        res.status(200).json({
            "message":"Employee registered successfully!!",
            "Employee":newEmployee
        });
    } catch (err) {
        next(err)
    }
}
const getAllEmployees = async(req, res,next) => {
    try {
        const employeeList = await Employee.find({});
        res.status(200).json({
            "Employees":employeeList
        })
    } catch (err) {
        next(err)
    }
}
const getOneEmployee = async(req, res,next) => {
    try {
        const id = req.params.id;
        let employee = await Employee.findById(id);
        
        if(!employee)
            return createError(400,"Employee not found")
       
            res.status(200).json({
                "message":"Employee is found",
                "employee":employee
            });
       

    } catch (err) {
       next(err)
    }
}
const updateEmployee = async(req, res,next) => {
    try {
        const id = req.params.id;
        let currentEmployee = await Employee.findById(id);
        if(!currentEmployee)
        return createError(400,"Employee not found")        
            currentEmployee["email"] = req.body.email!==null ?req.body.name:currentEmployee["email"]
            currentEmployee["last_name"] = req.body.last_name!==null ?req.body.last_name:currentEmployee["last_name"]
            currentEmployee["first_name"] = req.body.first_name!==null ?req.body.first_name:currentEmployee["first_name"]
            currentEmployee["gender"] = req.body.gender!==null ?req.body.gender:currentEmployee["gender"]
            currentEmployee["date_of_birth"] = req.body.date_of_birth!==null ?req.body.date_of_birth:currentEmployee["date_of_birth"]
            currentEmployee["phone_number"] = req.body.phone_number!==null ?req.body.phone_number:currentEmployee["phone_number"]
            currentEmployee["address"] = req.body.address!==null ?req.body.address:currentEmployee["address"]
            currentEmployee["activation_status"]=req.body.activation_status!==null ?req.body.activation_status:currentEmployee["activation_status"]

            await currentEmployee.save()           


            res.status(200).json({
                "message":"Employee updated successfully",
                "Updated Employee":currentEmployee
            });      


    } catch (err) {
        next(err)
    }

}
const deleteAllEmployees=async(req,res,next)=>{
    try{
       await Employee.remove({});
       res.status(200).json({
        "message":"All employees deleted successfully"
       })
    }
    catch(err){
        next(err)
    }

}
const deleteEmployee=async(req,res,next)=>{
    try{
        const id=req.params.employeeId;
        const employee=Employee.findById(id)
        if(!employee)
        return createError(400,"Employee not found")
        await Employee.remove({_id:employee._id})
        res.status(200).message({
            "message":"Employee deleted successfully",
            "employee":employee
        })
    }
    catch(err){
        next(err)
    }
}
const updateProfile=async(req,res,next)=>{
    try{
        let admin=await Admin.findOne(req.params.id)
        if(!admin)
        return createError('404',"Admin not found")
        const salt=bcrypt.genSaltSync(10)
        const hash=bcrypt.hashSync(req.body.password,salt)
        req.body.password=hash
        admin=req.body
        await admin.save()
        res.status(200).json({
            "message":"Profile Updated Successfully",
            "admin":admin
        })        
    }
    catch(err){
        next(err)
    }
}
module.exports = {
    addEmployee,getAllEmployees,updateEmployee,deleteAllEmployees,deleteEmployee,updateProfile,getOneEmployee
};

