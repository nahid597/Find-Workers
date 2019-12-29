import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../service/login.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  passwordCheck: any;
  check;

  get loginInfo() {
    return {
      Phone: this.loginForm.get('Phone'),
      Password: this.loginForm.get('Password'),
    };
  }

  constructor(private fb: FormBuilder, private authService: LoginService) {
     // this.passwordCheck = this.loginService.passwordCheck;
     // console.log('Save number constructor: ' + localStorage.getItem('loggedIn' || ''));
  }

  loginForm = this.fb.group({
    Phone: ['', Validators.required],
    Password: ['', Validators.required]
  });

  isLoading = false;
  authStatusSub: Subscription;

  ngOnInit() {
     this.authStatusSub = this.authService.getAuthStatus().subscribe(authStatus => {
         this.isLoading = false;
     });
 }

  login(formData) {
      this.isLoading = true;
      this.authService.login(formData.value);
  }

  ngOnDestroy() {
      this.authStatusSub.unsubscribe();
  }


}
