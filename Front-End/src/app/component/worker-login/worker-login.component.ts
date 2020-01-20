import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../service/login.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-worker-login',
  templateUrl: './worker-login.component.html',
  styleUrls: ['./worker-login.component.css']
})
export class WorkerLoginComponent implements OnInit, OnDestroy {

  passwordCheck: any;
  check = true;

  get loginInfo() {
    return {
      Phone: this.loginForm.get('Phone'),
      Password: this.loginForm.get('Password'),
    };
  }

  constructor(private fb: FormBuilder, private authService: LoginService, private route: ActivatedRoute) {}

  loginForm = this.fb.group({
    Phone: ['', Validators.required],
    Password: ['', Validators.required]
  });

  isLoading = false;
  authStatusSub: Subscription;

  ngOnInit() {
     this.authStatusSub = this.authService.getAuthStatus().subscribe(authStatus => {
         console.log('auht ', authStatus);
         this.isLoading = false;
         this.check = this.authService.check;
         console.log(this.authService.getUserId());
     });
 }

  login(formData) {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.isLoading = true;
    this.check = this.authService.workerLogin(formData.value);
  }

  ngOnDestroy() {
      this.authStatusSub.unsubscribe();
  }
}
