import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

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

  save(formData) {
    console.log(formData.value.Password);
    if (formData.valid && formData.value.Password === formData.value.confirmPassword) {
      this.loginService.save(formData);
    } else {
      console.log('form is not valid');
    }
  }

  // logout() {
  //   this.loginService.logout();
  // }
}
