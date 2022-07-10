import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomePageComponent } from './homePage/homePage.component';

const routes: Routes = [
  {path : "", component: HomePageComponent},
  
    {path : "login", component : LoginComponent},
    {path : "signup", component : SignupComponent}]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
