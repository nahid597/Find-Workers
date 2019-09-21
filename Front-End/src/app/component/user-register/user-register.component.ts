import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent {

  get username() {
    return {
      Phone: this.registrationForm.get('Phone'),
      Password: this.registrationForm.get('Password'),
      confirmPassword: this.registrationForm.get('confirmPassword')
    };
  }

  constructor(private fb: FormBuilder, private loginService: LoginService) {}

  registrationForm = this.fb.group({
    Password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    Phone: ['', Validators.required]
  });

  saveUser(formData) {
    console.log(formData.value.Password);
    if (formData.valid && formData.value.Password === formData.value.confirmPassword) {
      this.loginService.saveUser(formData);
    } else {
      console.log('form is not valid');
    }
  }

  // logout() {
  //   this.loginService.logout();
  // }

}
