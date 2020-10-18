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
  check: any;

  constructor(private http: HttpClient, private router: Router) { }

  getCode() {
    return this.code;
  }

  getMainData() {
    return this.mainData;
  }

  getCheck() {
    return this.check;
  }

  validationFunction(data, mainData, check) {
    console.log(data);
    this.http.post<any>(this.getUrl, data)
    .subscribe((response) => {
      console.log(response.body);
      const array = response.body.split(' ');
      this.code = array[7];
      console.log(array[7]);
      this.mainData = mainData;
      this.check = check;
      this.router.navigate(['/validatenumber']);
    });
  }
}
