import { Component, OnInit } from '@angular/core';
import { PhoneValidationService } from '../../service/phone-validation.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../service/login.service';
import { RouteService } from '../../service/route.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  identity: any;
  numberNotExist = '';

  constructor(private validate: PhoneValidationService,
              private router: Router,
              private http: HttpClient,
              private auth: LoginService,
              private route: RouteService
            ) { }

  ngOnInit() {
    this.identity = this.auth.getUserIdentity();
  }

  sendCode(f) {
    console.log('kdkdkdkdkdkdkdkdkd');
    const ob = {Phone: '+88' + f.value};
    console.log(ob);
    console.log(this.identity);
    this.identity ? this.http.post(this.route.forgetPasswordWorkerPath, {Phone: f.value})
    .subscribe(response => {
      console.log(response);
      if (response) {
        this.validate.setPhone(f.value);
        this.validate.validationFunction(ob, {Phone: f.value}, true, true);
      } else {
        this.numberNotExist = 'Phone number do not exist';
      }
    }) : this.http.post(this.route.forgetPasswordUserPath, {Phone: f.value})
    .subscribe(response => {
      console.log(response);
      if (response) {
        this.validate.setPhone(f.value);
        this.validate.validationFunction(ob, {Phone: f.value}, true, false);
      } else {
        this.numberNotExist = 'Phone number do not exist';
      }
    });
    // this.validate.validationFunction(f.value, {}, {});
  }

}
