import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { RegisterComponent } from './component/register/register.component';
import { UserRegisterComponent } from './component/user-register/user-register.component';
import { EarnComponent } from './component/earn/earn.component';
import { ServicesComponent } from './component/services/services.component';
import { CustomerSectionComponent } from './component/help/customer-section/customer-section.component';
import { WorkerSectionComponent } from './component/help/worker-section/worker-section.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: SignupComponent
  },
  {
    path: 'employee',
    component: RegisterComponent
  },
  {
    path: 'user',
    component: UserRegisterComponent
  },
  {
    path: 'earn',
    component: EarnComponent
  },
  {
    path: 'services',
    component: ServicesComponent
  },
  {
    path : 'help/customer',
    component : CustomerSectionComponent
  },
  {
    path : 'help/worker',
    component : WorkerSectionComponent
  },
  {
    path : 'help/customer/How can I become a customer? What are the requirements?',
    component : CustomerSectionComponent
  },
  {
    path : 'help/customer/How to recover my block account?',
    component : CustomerSectionComponent
  },
  {
    path : 'help/customer/How to change account password?',
    component : CustomerSectionComponent
  },
  {
    path : 'help/customer/My app is not working,What should I do?',
    component : CustomerSectionComponent
  },
  {
    path : 'help/customer/How can I report an Issue/Complain?',
    component : CustomerSectionComponent
  },
  {
    path : 'help/customer/How I can get the Find-Worker app?',
    component : CustomerSectionComponent
  },
  {
    path : "help/customer/I can't sign into my account?",
    component : CustomerSectionComponent
  },
  {
    path : 'help/customer/I forget my password,What can I do?',
    component : CustomerSectionComponent
  },
  {
    path : "help/customer/I can't update my phone number or email.",
    component : CustomerSectionComponent
  },
  {
    path : "help/customer/My password reset link isn't working.",
    component : CustomerSectionComponent
  },
  {
    path : "help/customer/How to talk with a worker?",
    component : CustomerSectionComponent
  },
  {
    path : "help/customer/I want to update email,text or push notification settings.",
    component : CustomerSectionComponent
  },
  {
    path : "help/customer/What is Find-Worker system?",
    component : CustomerSectionComponent
  },
  {
    path : "help/customer/My worker’s number is unreachable. What should I do?",
    component : CustomerSectionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
