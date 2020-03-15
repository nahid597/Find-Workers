import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../service/login.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit, OnDestroy, DoCheck {

  error = false;
  str = '';

  get username() {
    return {
      Name: this.registrationForm.get('Name'),
      Phone: this.registrationForm.get('Phone'),
      Password: this.registrationForm.get('Password'),
      confirmPassword: this.registrationForm.get('confirmPassword')
    };
  }

  constructor(private fb: FormBuilder, private authService: LoginService) {}

  registrationForm = this.fb.group({
    Name: ['', Validators.required],
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

  ngDoCheck() {
    this.error = this.authService.isError();
    if (this.error) {
      this.str = 'Phone number already exists';
      console.log(this.str);
    }
  }

  saveUser(formData: NgForm) {

    if (formData.valid && formData.value.Password !== formData.value.confirmPassword) {
      this.str = 'Password do not match';
    } else if (!formData.value.Name || !formData.value.Password || !formData.value.Phone || !formData.value.confirmPassword) {
      this.str = 'Please fill all required (*) field';
    } else if (formData.valid && formData.value.Password === formData.value.confirmPassword) {
      this.isLoadin = true;
      this.authService.createUser(formData.value);
      console.log(formData.value);
      return;
    }
  }


  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }


}

