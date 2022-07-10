import User from "../models/userModel.js";
import axios from "axios";
import asyncHandler from "express-async-handler"

const signup = asyncHandler(async(req,res)=>{
const {name ,mobileNumber ,email ,password} = req.body;


const newUser = new User({
    name : name,
    mobileNumber : mobileNumber,
    email : email,
    password : password
})

 const savedUser = await newUser.save();
 if(savedUser){
    console.log(savedUser)
    console.log("email", savedUser.email)
    console.log("mobileNumber", savedUser.mobileNumber)
    console.log("name" , savedUser.name)
    res.status(201).json({ message :"User saved Successfully" , user : savedUser}) 

    await axios({
        method :"POST",
        url : "https://api.msg91.com/api/v5/email/send",
        headers : {
            contentType : "application/JSON",
            Accept : "application/json"
        },
        data :{
            "to": [
              {
                "name": `${savedUser.name}`,
                "email": "sachinram4968@gmail.com"
              }
            ],
            "from": {
              "name": "sachin",
              "email": "info@n7q9sc.mailer91.com"
            },
            "domain": "n7q9sc.mailer91.com",
            "mail_type_id": "1",
            "template_id": "BFSILOGIN",
            "variables": {
              "name ": `${savedUser.name}`,
              "id": `${savedUser.email}`,
              "password":`${savedUser.password}`
            },
            "authkey": "379262AlpMeb6U62c6ae11P1"
          }
    }).then(res =>console.log("Email Send SuccessFully"))
    .catch(err => console.log("Error In Email"))
 }else{
    res.status(404).json({message: "enter correct details"})
 }
})

const login = asyncHandler(async(req,res)=>{
const {email, password} = req.body;


const findUser = await User.find({email})
    if(findUser.length>0){
        if(findUser[0].password == password){
        res.status(201).json({message:"Login SuccessFully", user:findUser})
        }else{
            res.status(404).json({message : "Login Detail Wrong"})
        }
    }else{
        res.status(404).json({message: "User Not Found"})
    }
})


//send OTP
const sendOTP = asyncHandler(async(req,res)=>{

let {mobileNumber} = req.body;


const checkMobileNo =  await User.find({mobileNumber})
console.log(checkMobileNo)

if(checkMobileNo.length>0){
    await axios({
        method :"GET",
        url : "https://api.msg91.com/api/v5/otp",
        headers : {
            "Content-Type" : "application/json"},
        params : {
            template_id:"62c6cb221126fd5e5828a563",
            mobile :`91${mobileNumber}`, 
            authkey :"379262AlpMeb6U62c6ae11P1",
            DLT_TE_ID : "1707165294270146402"
            }
})
.then(ress => res.status(201).json({messsag: "OTP send Successfully"}))
.catch(err=> res.status(401).json({messsag: "Error Found"}))

}else{
    res.status(404).json({message: "Mobile Number Not Registered"})
}
})



// //varifyOTP
const verifyOTP = asyncHandler(async(req,res)=>{

    const { mobileNumber, code} = req.body;
    
    const checkMobileNo =  await User.find({mobileNumber})
    if(checkMobileNo){

        await axios({
                    method : "GET",
                    url :"https://api.msg91.com/api/v5/otp/verify",
                    params  : {
                        otp : code,
                        authkey : "379262AlpMeb6U62c6ae11P1",
                        mobile : `91${mobileNumber}`
                    }
                })
                .then(success =>  res.status(201).json(success.data))
                .catch(err => res.status(401).json(err.data))
    }

})


export {signup, login, sendOTP, verifyOTP};