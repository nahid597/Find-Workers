import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../service/login.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { PhoneValidationService } from '../../service/phone-validation.service';
import { HttpClient } from '@angular/common/http';
import { RouteService } from '../../service/route.service';

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

  constructor(private fb: FormBuilder,
              private authService: LoginService,
              private validate: PhoneValidationService,
              private http: HttpClient,
              private route: RouteService) {}

  registrationForm = this.fb.group({
    Name: ['', Validators.required],
    Password: ['', Validators.compose([ Validators.required, Validators.minLength(8)])],
    confirmPassword: ['', Validators.required],
    Phone: ['', Validators.compose([Validators.required, Validators.pattern('^((\\+88-?)|0)?[0-9]{11}$')])]
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
    console.log('new user');

    if (formData.valid && formData.value.Password !== formData.value.confirmPassword) {
      this.str = 'Password do not match';
    } else if (!formData.value.Name || !formData.value.Password || !formData.value.Phone || !formData.value.confirmPassword) {
      this.str = 'Please fill all required (*) field';
    } else if (formData.valid && formData.value.Password === formData.value.confirmPassword) {
      this.isLoadin = true;
      const ob = {
        Phone: '+88' + formData.value.Phone,
      };
      this.http.post(this.route.serverRout + '/admin/users/checkphone', formData.value)
        .subscribe(response => {
          console.log(response);
          (response) ? this.str = 'Phone number already exists' :
          this.validate.validationFunction(ob, formData.value, false, false);
        });
      // this.authService.createUser(formData.value);
      console.log(formData.value);
      return;
    }
  }


  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }


}

