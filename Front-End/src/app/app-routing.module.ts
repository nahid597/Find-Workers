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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
