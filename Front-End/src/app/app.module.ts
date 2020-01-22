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
import { CategoryService } from './service/category.service';
import { CategoryComponent } from './component/category/category.component';
import { FooterpageComponent } from './component/footerpage/footerpage.component';
import { ProfileComponent } from './component/profile/profile.component';
import { AuthGuardService } from './service/auth-guard.service';
import { AuthInterceptorService } from './service/auth-interceptor.service';
import { UserLoginComponent } from './component/user-login/user-login.component';
import { WorkerLoginComponent } from './component/worker-login/worker-login.component';


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
    CategoryComponent,
    FooterpageComponent,
    ProfileComponent,
    UserLoginComponent,
    WorkerLoginComponent
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
