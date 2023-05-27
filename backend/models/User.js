const mongoose =require("mongoose")

const UserSchema=new mongoose.Schema({
    username:{
        unique:[true,"The login exists."],
        required:[true,"Please enter your username"],
        type:String
    },
    email:{
        type:String,
        required:[true,"Please enter your email"],
        unique:[true,"The email exists"]
    },
    password:{
        type:String,
        required:[true,"Please enter your password "]
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

module.exports=mongoose.model("User",UserSchema)