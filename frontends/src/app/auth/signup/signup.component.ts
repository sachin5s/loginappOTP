import {Component, OnInit} from "@angular/core"
import { FormControl, FormGroup, Validators } from "@angular/forms"
import { Router } from "@angular/router";
import { AuthServices } from "../authServices";

@Component({
    selector : "app-signup",
    templateUrl  : "signup.component.html",
    styleUrls : ["signup.component.css"]
})

export class SignupComponent implements OnInit{
    registerFormData! : FormGroup;
    errormessage  =  false; 
    successmessage = false;
    message:String = ""

    constructor(private authServices:AuthServices , private router : Router){}

    ngOnInit(): void {
        
        this.initForm()
    }


    private  initForm(){
        let name = ""
        let email =""
        let mobileNumber;
        let password =""
        let rePassword = ""

        this.registerFormData = new FormGroup({
            "name": new FormControl(name,{validators:[Validators.required]}),
            "email": new FormControl(email,{validators:[Validators.required]}),
            "mobileNumber" : new FormControl(mobileNumber, {validators:[Validators.required, Validators.pattern(/[7-9]{1}[0-9]{9}/),Validators.maxLength(10)]}),
            "password" : new FormControl(password, {validators:[Validators.required, Validators.minLength(6)]}),
            "rePassword" : new FormControl(rePassword, {validators:[Validators.required, Validators.minLength(6)]})
        })
    }   

    onSubmit(){
        if(this.registerFormData.value.password == this.registerFormData.value.rePassword){

        this.authServices.signup(this.registerFormData.value.name, this.registerFormData.value.email, this.registerFormData.value.mobileNumber, this.registerFormData.value.password)
        .subscribe(res =>{
                this.successmessage = true
                this.message = res.message
                alert("User Registered Successfully .. we send Details on Email")
                this.router.navigate(["/login"])
        },
        error=>{
            this.errormessage = true
            if(error.error.message){
                this.message = "Something Error"
            }else{
            this.message = " enter correct Details and Email & mobileNumber must be Unique" 
            }     
        })
    }else{
        this.errormessage = true
        this.message ="Password NOT Matched"    
    }
    }

}