const mongoose=require('mongoose')

const employeeSchema=mongoose.Schema({
    email:{
        type:String,
        validate:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        required:true

    },
    last_name:{
        type:String,
        required:true
    },
    first_name:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        enum:['Male','Female'],
        required:true
    },
    date_of_birth:{
        type:Date,
        required:true
    },
    phone_number:{
        type:String,
        validate:/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    activation_status:{
        type:Boolean,
        default:true
    },
    password:{
        type:String,
        required:true,
        select:false
    }
},
{
    timestamps:true
})

const Employee=mongoose.model('Employee',employeeSchema)

module.exports=Employee