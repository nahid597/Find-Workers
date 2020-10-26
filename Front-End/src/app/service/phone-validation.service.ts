import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PhoneValidationService {

  private serverRout = 'http://192.168.43.70:4444';
  private getUrl = this.serverRout + '/validate/phone';
  code;
  mainData: any;
  userStatus: any;
  checkForgetPassword = false;
  phoneNumber: any;

  constructor(private http: HttpClient, private router: Router) { }

  getCode() {
    return this.code;
  }

  getMainData() {
    return this.mainData;
  }

  getCheck() {
    return this.userStatus;
  }

  getForgetPasswordBoolianValue() {
    return this.checkForgetPassword;
  }

  setPhone(phoneNumber) {
    this.phoneNumber = phoneNumber;
  }

  getPhone() {
    return this.phoneNumber;
  }

  validationFunction(data, mainData, forgetStatus, userStatus) {
    console.log(data);
    this.http.post<any>(this.getUrl, data)
    .subscribe((response) => {
      console.log(response.body);
      const array = response.body.split(' ');
      this.code = array[7];
      console.log(array[7]);
      this.mainData = mainData;
      this.userStatus = userStatus;
      this.checkForgetPassword = forgetStatus;
      this.router.navigate(['/validatenumber']);
    });
  }
}
