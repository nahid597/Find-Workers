import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from '../environments/environment.prod';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { LoginService } from './service/login.service';
import { NavbarComponent } from './component/navbar/navbar.component';
import { RegisterComponent } from './component/register/register.component';
import { UserRegisterComponent } from './component/user-register/user-register.component';
import { SignupComponent } from './component/signup/signup.component';
import { EarnComponent } from './component/earn/earn.component';
import { ServicesComponent } from './component/services/services.component';
import { EditprofileComponent } from './component/editprofile/editprofile.component';
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
import { ForgotPasswordComponent } from './component/help/forgot-password/forgot-password.component';
import { BecomeWorkerComponent } from './component/help/become-worker/become-worker.component';
import { WorkerComplainComponent } from './component/help/worker-complain/worker-complain.component';
import { WorkerPhoneUpdateComponent } from './component/help/worker-phone-update/worker-phone-update.component';
import { WorkerSignInProblemComponent } from './component/help/worker-sign-in-problem/worker-sign-in-problem.component';
import { CategoryService } from './service/category.service';
import { CategoryComponent } from './component/category/category.component';
import { FooterpageComponent } from './component/footerpage/footerpage.component';
import { ProfileComponent } from './component/profile/profile.component';
import { AuthGuardService } from './service/auth-guard.service';
import { AuthInterceptorService } from './service/auth-interceptor.service';
import { UserLoginComponent } from './component/user-login/user-login.component';
import { WorkerLoginComponent } from './component/worker-login/worker-login.component';
import { UpdatepasswordworkerComponent } from './component/help/updatepasswordworker/updatepasswordworker.component';
import { PhoneNumberUpdateWorkerComponent } from './component/help/phone-number-update-worker/phone-number-update-worker.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    RegisterComponent,
    UserRegisterComponent,
    SignupComponent,
    EarnComponent,
    ServicesComponent,
    EditprofileComponent,
    CustomerSectionComponent,
    WorkerSectionComponent,
    CusComponentIComponent,
    CustomercomponetIIComponent,
    CustomercomponentIIIComponent,
    CustomercomponentIVComponent,
    PhoneNumberUpdateComponent,
    CustomerComponentVComponent,
    UpdatePasswordComponent,
    CustomerComponentVIComponent,
    CustomerCompontVIIComponent,
    CustomerComponentVIIIComponent,
    ForgotPasswordComponent,
    BecomeWorkerComponent,
    WorkerComplainComponent,
    WorkerPhoneUpdateComponent,
    WorkerSignInProblemComponent, 
    WorkerSignInProblemComponent,
    CategoryComponent,
    FooterpageComponent,
    ProfileComponent,
    UserLoginComponent,
    WorkerLoginComponent,
    UpdatepasswordworkerComponent,
    PhoneNumberUpdateWorkerComponent
  ],
  imports: [
    MatButtonModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS , useClass: AuthInterceptorService, multi: true},
     LoginService, CategoryService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
