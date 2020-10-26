import { Component, OnInit, DoCheck, ElementRef, ViewChild } from '@angular/core';
import { PhoneValidationService } from '../../service/phone-validation.service';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-validate-number',
  templateUrl: './validate-number.component.html',
  styleUrls: ['./validate-number.component.css']
})
export class ValidateNumberComponent implements OnInit, DoCheck {

  code;
  mainData: any;
  str = '';
  check: any;
  searchValue = '';
  checkForgetPassword: any;

  constructor(private validate: PhoneValidationService,
              private register: LoginService,
              private router: Router) { }

  ngOnInit() {
    this.code = this.validate.getCode();
    this.mainData = this.validate.getMainData();
    this.check = this.validate.getCheck();
    this.checkForgetPassword = this.validate.getForgetPasswordBoolianValue();
  }

  ngDoCheck() {
    this.code = this.validate.getCode();
    this.mainData = this.validate.getMainData();
    this.check = this.validate.getCheck();
    this.checkForgetPassword = this.validate.getForgetPasswordBoolianValue();
    console.log(this.mainData);
  }

  matchCode(f) {
    console.log(f.value);
    if (this.code === f.value) {
      console.log('code is correct');
      if (this.checkForgetPassword) {
        this.router.navigate(['/choosepassword']);
      } else {
        this.check ? this.register.createWorker(this.mainData) : this.register.createUser(this.mainData);
      }
    } else {
        console.log('code is incorrect');
        this.str = 'incorrect code';
    }
  }

  resendCode() {
    this.str = '';
    this.searchValue = '';
    console.log('this.mainData.Phone');
    const ob = {
      Phone: '+88' + this.mainData.Phone
    };
    this.validate.validationFunction(ob, this.mainData, this.checkForgetPassword, this.check);
  }

}
