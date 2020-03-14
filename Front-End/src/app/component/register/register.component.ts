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
  image;
  selectedFile: File = null;
  fd: any;
  ob: any;

  get username() {
    return {
      Name: this.registrationForm.get('Name'),
      Phone: this.registrationForm.get('Phone'),
      Password: this.registrationForm.get('Password'),
      confirmPassword: this.registrationForm.get('confirmPassword'),
      Category: this.registrationForm.get('Category'),
      // Image: this.registrationForm.get('Image'),
    };
  }

  constructor(private fb: FormBuilder, private authService: LoginService, private element: ElementRef) {}

  registrationForm = this.fb.group({
    Name: ['', Validators.required],
    Password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    Phone: ['', Validators.required],
    Category: ['', Validators.required],
    // Image: ['', Validators.required]
  });


  isLoadin = false;
  private authStatusSub: Subscription;


  ngOnInit() {
      this.authStatusSub = this.authService.getAuthStatus().subscribe(authStatus => {
          this.isLoadin = false;
      });
  }

  save(formData) {
    console.log(formData.value);
    // formData.append('Image', this.image);
    if (formData.valid && formData.value.Password === formData.value.confirmPassword) {
      this.isLoadin = true;
      this.ob = {
        Name: formData.value.Name,
        Phone: formData.value.Phone,
        Password: formData.value.Password,
        Category: formData.value.Category,
        // Image: this.fd
      };
      this.authService.createWorker(this.ob);
      console.log(this.ob);
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
    // if (event.target.files.length > 0) {
    //   let file = event.target.files[0];
    //   this.image = file;
    // }
  }


  createFormData(event) {
    this.selectedFile = <File> (event.target.files[0]);
    this.fd.append('file', this.selectedFile, this.selectedFile.name);
  }


  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
