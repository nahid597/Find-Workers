import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../service/login.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  contain;

  get username() {
    return {
      Name: this.registrationForm.get('Name'),
      Phone: this.registrationForm.get('Phone'),
      Password: this.registrationForm.get('Password'),
      confirmPassword: this.registrationForm.get('confirmPassword'),
      Category: this.registrationForm.get('Category'),
      Image: this.registrationForm.get('Image'),
    };
  }

  constructor(private fb: FormBuilder, private authService: LoginService, private element: ElementRef) {}

  registrationForm = this.fb.group({
    Name: ['', Validators.required],
    Password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    Phone: ['', Validators.required],
    Category: ['', Validators.required],
    Image: ['', Validators.required]
  });


  isLoadin = false;
  private authStatusSub: Subscription;


  ngOnInit() {
      this.authStatusSub = this.authService.getAuthStatus().subscribe(authStatus => {
          this.isLoadin = false;
      });
  }

  save(formData) {
    //console.log(formData);
    if (formData.valid || formData.value.password === formData.value.confirmPassword) {
      this.isLoadin = true;
      this.authService.createWorker(formData.value);
      console.log(formData.value);
      return;
    }
    console.log('invalid');
  }


  changeListner(event) {
    const reader = new FileReader();
    const image = this.element.nativeElement.querySelector('.image');

    reader.onload = (e) => {
        const src = reader.result;
        image.src = src;
    };

    reader.readAsDataURL(event.target.files[0]);
  }


  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
