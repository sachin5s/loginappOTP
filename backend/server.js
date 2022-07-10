import express from "express"
import connectDB from "./connectDB/db.js"
import loginRoutes from "./routes/loginRoutes.js"


const app = express()

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*")
    res.setHeader("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept")
    res.setHeader("Access-Control-Allow-Methods","GET,POST,UPDATE,PATCH, PUT,DELETE,OPTIONS")
    next()
})


connectDB()

app.use(express.json())

app.use("/api/user",loginRoutes)


app.listen(5000,
    console.log("server is running"))