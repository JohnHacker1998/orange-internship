const mongoose=require('mongoose')

const adminSchema=mongoose.Schema({
    last_name:{
        type:String,
        required:true
    },
    first_name:{
        type:String,
        required:true
    },

    phone_number:{
        type:String,
        validate:/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
        required:true
    },
    email:{
        type:String,
        validate:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        required:true

    },
    password:{
        type:String,
        required:true
    }
},
{
    timestamps:true
})

const Admin=mongoose.model('Admin',adminSchema)

module.exports=Admin