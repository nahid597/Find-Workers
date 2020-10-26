import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PhoneValidationService } from '../../service/phone-validation.service';
import { HttpClient } from '@angular/common/http';
import { RouteService } from '../../service/route.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-password',
  templateUrl: './choose-password.component.html',
  styleUrls: ['./choose-password.component.css']
})
export class ChoosePasswordComponent implements OnInit {
  str = '';
  userStatus: any;
  phoneNumber: any;
  get username() {
    return {
      Password: this.passwordForm.get('Password'),
      confirmPassword: this.passwordForm.get('confirmPassword'),
    };
  }

  constructor(private fb: FormBuilder,
              private validate: PhoneValidationService,
              private http: HttpClient,
              private route: RouteService,
              private router: Router) { }

  passwordForm = this.fb.group({
    Password: ['', Validators.compose([ Validators.required, Validators.minLength(8)])],
    confirmPassword: ['', Validators.required],
  });

  ngOnInit() {
    this.userStatus = this.validate.getCheck();
    this.phoneNumber = this.validate.getPhone();
  }

  passwordUpdate(f) {
    if (f.valid && f.value.Password !== f.value.confirmPassword) {
      this.str = 'Password do not match';
    } else if (!f.value.Password || !f.value.confirmPassword) {
      this.str = 'Fill all required field';
    } else if (f.valid && f.value.Password === f.value.confirmPassword) {
      const ob = {
        Phone: this.phoneNumber,
        Password: f.value.Password
      };
      this.userStatus ? this.http.put(this.route.serverRout + '/admin/workers/password/update', ob)
      .subscribe(response => {
        console.log(response);
        response ? this.router.navigate(['/']) : this.str = 'update failed';
      }) : this.http.put(this.route.serverRout + '/admin/users/password/update', ob)
      .subscribe(response => {
        console.log(response);
        response ? this.router.navigate(['/']) : this.str = 'update failed';
      });
    }
  }

}
