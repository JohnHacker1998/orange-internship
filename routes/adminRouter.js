const express = require('express');
const adminRouter = express.Router();
const {addEmployee,getAllEmployees,updateEmployee,deleteAllEmployees,deleteEmployee,updateProfile,getOneEmployee}=require('../controllers/adminController')
const {verifyAdmin}=require('../utils/verifyToken')


adminRouter.route('/')
.get(verifyAdmin,getAllEmployees)
.post(verifyAdmin,addEmployee)
.put(verifyAdmin,updateProfile)
.delete(verifyAdmin,deleteAllEmployees)


adminRouter.route('/:employeeId')
.get(verifyAdmin,getOneEmployee)
.put(verifyAdmin,updateEmployee)
.delete(verifyAdmin,deleteEmployee)

module.exports=adminRouter