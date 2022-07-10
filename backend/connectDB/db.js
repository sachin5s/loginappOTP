import mongoose from "mongoose"
import asyncHandler from "express-async-handler"

const connectDB = asyncHandler(async(req,res)=>{
try{
    const conn = await mongoose.connect("mongodb://localhost:27017/userDetail", {
        useNewUrlParser : true,
        useUnifiedTopology : true
    })
    console.log("MONGODB connected") 
}catch(error){
    console.log(error)
    process.exit(1)
}
})

export default connectDB;