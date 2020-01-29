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
import { CategoryComponent } from './component/category/category.component';
import { ProfileComponent } from './component/profile/profile.component';
import { AuthGuardService } from './service/auth-guard.service';
import { WorkerLoginComponent } from './component/worker-login/worker-login.component';
import { UserLoginComponent } from './component/user-login/user-login.component';
import { EditprofileComponent } from './component/editprofile/editprofile.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'workerlogin',
    component: WorkerLoginComponent
  },
  {
    path: 'userlogin',
    component: UserLoginComponent
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
    path: 'help',
    component: CustomerSectionComponent
  },
  {
    path: 'category',
    component: CategoryComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'profile/:id',
    component: EditprofileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
