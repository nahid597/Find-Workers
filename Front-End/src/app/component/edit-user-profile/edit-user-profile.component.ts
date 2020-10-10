import { Component, OnInit, OnDestroy, ElementRef, DoCheck } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.css']
})
export class EditUserProfileComponent implements OnInit, OnDestroy, DoCheck {

  formdata: any;
  res;
  ob: any;
  err = false;
  str = '';
  serverRoute;

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

  constructor(
    private route: ActivatedRoute, private router: Router,
    private fb: FormBuilder, private authService: LoginService, private element: ElementRef
  ) {
  }

  registrationForm = this.fb.group({
    Name: ['', Validators.required],
    Phone: ['', Validators.required]
  });


  isLoadin = false;
  private authStatusSub: Subscription;


  ngOnInit() {

    this.serverRoute = this.authService.getServerRoute();
    this.formdata = this.authService.getUserId();
    // console.log(this.formdata.userId);
    this.authStatusSub = this.authService.getAuthStatus().subscribe(authStatus => {
        this.isLoadin = false;
        console.log(authStatus);
    });
  }

  ngDoCheck() {
    this.err = this.authService.isErr();
    if (this.err) {
      this.str = 'Please put a valid number.';
    }
  }

  updateProfile(formmData) {
    console.log(formmData.value);
    this.ob = {
      _id: this.formdata.userId._id,
      Phone: formmData.value.Phone
    };
    console.log(this.ob);
    this.isLoadin = true;
    this.authService.updateWorker(this.ob, this.serverRoute + '/admin/users/update', this.serverRoute + '/admin/users/get');
    // setTimeout(() => {

    // }, 500);
    return;
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
