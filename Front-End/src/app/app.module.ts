import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
    CustomercomponentIIIComponent 
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
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
