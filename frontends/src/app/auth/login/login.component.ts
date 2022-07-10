import { Component, OnInit } from "@angular/core";

import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthServices } from "../authServices";

@Component({
    selector : "app-login",
    templateUrl : "login.component.html",
    styleUrls : ["login.component.css"]
})

export class LoginComponent implements OnInit{
loginFormData! :FormGroup;
mobileFormData! : FormGroup;
varifyOTPformData!: FormGroup;

varifyOTP = false
isNumberMode = false;
 errorMessage = false
 succesMessage = false
message :String = ""

constructor(private authservies :AuthServices){}

ngOnInit(): void {
    this.initFormWithLoginData()
    this.initFormWithMObile()
    this.initFormVarifyOTP()
}

private initFormWithLoginData(){
    let email = ""
    let password = ""
    this.loginFormData = new FormGroup({
        "email": new FormControl(email,{validators:[Validators.required]}),
        "password" : new FormControl(password,{validators: [Validators.required, Validators.minLength(6)]})
    })
}

private initFormWithMObile(){
    let mobileNumber;
    this.mobileFormData = new FormGroup({
        "mobileNumber" : new FormControl(mobileNumber,{validators:[Validators.required, Validators.pattern(/[7-9]{1}[0-9]{9}/), Validators.maxLength(10)]})
    })
}

private initFormVarifyOTP(){
    let code;
    this.varifyOTPformData = new FormGroup({
        "code" : new FormControl(code,{validators:[Validators.required,Validators.minLength(4)]})
    })
}


changeMobileMode(){
 this.isNumberMode = true
}

onSubmit(){
    this.succesMessage = false;
    this.errorMessage = false;
    // console.log(this.loginFormData.value.email)
    this.authservies.login(this.loginFormData.value.email , this.loginFormData.value.password)
        .subscribe(res=>{
            this.succesMessage = true
            this.message = res.message
        },
        error=>{
            this.errorMessage = true
            this.message = error.error.message
        })
}

onNumberSubmit(){
// console.log(this.mobileFormData)
this.succesMessage = false;
this.errorMessage = false;
  sessionStorage.setItem("mobileNumber",this.mobileFormData.value.mobileNumber)
this.authservies.sendOtp(this.mobileFormData.value.mobileNumber)
  .subscribe(res=>{
        this.succesMessage = true;
        this.message = "OTP send SuccessFully"
        this.varifyOTP = true
        },
    error =>{ this.errorMessage = true;
        this.varifyOTP = true
    this.message = "OTP NOT SEND"})
}

onVarifyOTP(){
    this.succesMessage = false;
    this.errorMessage = false;
    // console.log(this.varifyOTPformData)
  let mobileNumber = String(sessionStorage.getItem("mobileNumber"))
    this.authservies.varifyOtp(mobileNumber, this.varifyOTPformData.value.code)
    .subscribe(res=>{
        this.succesMessage = true
        this.message = res.message;
    },
    error => {
        this.succesMessage = true
        this.message = error.message;
    })
}
}