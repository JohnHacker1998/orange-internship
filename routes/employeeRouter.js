let express = require('express');
let employeeRouter = express.Router();
let employeeController=require('../controllers/employeeController')
const {verifyEmployee}=require('../utils/verifyToken')

employeeRouter.route('/')
    .put(verifyEmployee,employeeController)

module.exports=employeeRouter