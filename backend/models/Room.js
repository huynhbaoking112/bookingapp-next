const mongoose=require("mongoose")
 
const RoomSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    desc:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    photo:{
        type:String,
    },
    type:{
        type:String,
        required:true
    },
    review:{
        type:Number,
        required:true,
        min:1,
        max:5
    },
    unavailableDates:{
        type:[Array],
        default:[]
    }
},{timestamps:true})

module.exports=mongoose.model("Room",RoomSchema)