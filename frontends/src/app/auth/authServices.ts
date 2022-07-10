import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn:"root"
})

export class AuthServices {

    constructor(private http:HttpClient){}

    signup(name:String,mobileNumber:Number, email:String,password : String){
    return this.http.post<{message:String}>("http://localhost:5000/api/user/signup",{name, mobileNumber,email, password})
    }

    login(email:String, password :String){
      return  this.http.post<{message:String}>("http://localhost:5000/api/user/login",{email,password})
    }

    sendOtp(mobileNumber : Number){
    return   this.http.post("http://localhost:5000/api/user/sendOtp",{mobileNumber})
       }

    varifyOtp(mobileNumber:String, code :Number){
        return this.http.post<{message: String,type:String }>("http://localhost:5000/api/user/verifyOtp",{mobileNumber,code})
    }
}