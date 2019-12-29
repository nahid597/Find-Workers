import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../service/login.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit, OnDestroy {

  get username() {
    return {
      Phone: this.registrationForm.get('Phone'),
      Password: this.registrationForm.get('Password'),
      confirmPassword: this.registrationForm.get('confirmPassword')
    };
  }

  constructor(private fb: FormBuilder, private authService: LoginService) {}

  registrationForm = this.fb.group({
    Password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    Phone: ['', Validators.required]
  });

  isLoadin = false;
  private authStatusSub: Subscription;


  ngOnInit() {
      this.authStatusSub = this.authService.getAuthStatus().subscribe(authStatus => {
          this.isLoadin = false;
      });
  }

  onSignup(formData: NgForm) {
      if (formData.invalid) {
          return;
      }

      this.isLoadin = true;
      this.authService.createUser(formData.value);
  }


  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }


}

