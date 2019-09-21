import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  passwordCheck: any;

  get loginInfo() {
    return {
      Phone: this.loginForm.get('Phone'),
      Password: this.loginForm.get('Password'),
    };
  }

  constructor(private fb: FormBuilder, private loginService: LoginService, private httpClient: HttpClient) {
     this.passwordCheck = this.loginService.passwordCheck;
  }

  loginForm = this.fb.group({
    Phone: ['', Validators.required],
    Password: ['', Validators.required]
  });

  login(formValue) {
    console.log(formValue.value);
    this.loginService.login(formValue.value);
  }

}
