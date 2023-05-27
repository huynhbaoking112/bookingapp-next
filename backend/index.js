const express=require("express")
const mongoose=require("mongoose")
const dotenv=require("dotenv").config()
const authController=require("./controllers/authController")
const roomController =require("./controllers/roomController")
const uploadController=require("./controllers/uploadController")
const cors =require("cors")

const app=express()
app.use(cors())


//connectDB
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("DB connect success");
})

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/images",express.static("public/images"))//http://localhost:5000/images/Filenamehere
app.use("/auth",authController)
app.use("/room",roomController )
app.use("/upload",uploadController)




//start our server

app.listen(process.env.PORT,()=>{
    console.log("App listen on ", process.env.PORT  );
})