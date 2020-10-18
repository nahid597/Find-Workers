import { Component, OnInit, DoCheck } from '@angular/core';
import { PhoneValidationService } from '../../service/phone-validation.service';
import { LoginService } from '../../service/login.service';

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

  constructor(private validate: PhoneValidationService, private register: LoginService) { }

  ngOnInit() {
    this.code = this.validate.getCode();
    this.mainData = this.validate.getMainData();
    this.check = this.validate.getCheck();
  }

  ngDoCheck() {
    this.code = this.validate.getCode();
    this.mainData = this.validate.getMainData();
    this.check = this.validate.getCheck();
    console.log(this.mainData);
  }

  matchCode(f) {
    console.log(f.value);
    if (this.code === f.value) {
      console.log('code is correct');
      this.check ? this.register.createWorker(this.mainData) : this.register.createUser(this.mainData);
    } else {
      console.log('code is incorrect');
      this.str = 'incorrect code';
    }
  }

  resendCode() {
    this.str = '';
    console.log(this.mainData.Phone);
    const ob = {
      Phone: this.mainData.Phone
    };
    this.validate.validationFunction(ob, this.mainData, this.check);
  }

}
