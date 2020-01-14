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
import { CusComponentIComponent } from './component/help/customer-section/cus-component-i/cus-component-i.component';
import { CustomercomponetIIComponent } from './component/help/customer-section/customercomponet-ii/customercomponet-ii.component';
import { CustomercomponentIIIComponent } from './component/help/customer-section/customercomponent-iii/customercomponent-iii.component';
import { CustomercomponentIVComponent } from './component/help/customer-section/customercomponent-iv/customercomponent-iv.component';
import { PhoneNumberUpdateComponent } from './component/help/customer-section/phone-number-update/phone-number-update.component';
import { CustomerComponentVComponent } from './component/help/customer-component-v/customer-component-v.component';
import { UpdatePasswordComponent } from './component/help/update-password/update-password.component';
import { CustomerComponentVIComponent } from './component/help/customer-component-vi/customer-component-vi.component';
import { CustomerCompontVIIComponent } from './component/help/customer-compont-vii/customer-compont-vii.component';
import { CustomerComponentVIIIComponent } from './component/help/customer-component-viii/customer-component-viii.component';


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
    component : CusComponentIComponent
  },
  {
    path : 'help/customer/How to recover my block account?',
    component : CustomerSectionComponent
  },
  {
    path : 'help/customer/How to change account password?',
    component : UpdatePasswordComponent
  },
  {
    path : 'help/customer/My app is not working,What should I do?',
    component : CustomercomponetIIComponent
  },
  {
    path : 'help/customer/How can I report an Issue/Complain?',
    component : CustomerCompontVIIComponent
  },
  {
    path : 'help/customer/How I can get the Find-Worker app?',
    component : CustomerComponentVComponent
  },
  {
    path : "help/customer/I can't sign into my account?",
    component : CustomercomponentIIIComponent
  },
 
  {
    path : "help/customer/I can't update my phone number or email.",
    component : CustomercomponentIVComponent
  },
  {
    path : "help/customer/How to talk with a worker?",
    component : CustomerComponentVIComponent
  },
  {
    path : "help/customer/How Find-Worker system is working?",
    component : CustomerComponentVIIIComponent
  },
  {
    path : "help/customer/My worker’s number is unreachable. What should I do?",
    component : CustomerSectionComponent
  },
  {
    path : "phone_number_update",
    component : PhoneNumberUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
