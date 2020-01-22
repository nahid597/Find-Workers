import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private http : HttpClient,private router : Router) { }

  forgotpassword = new FormGroup({

    phone_number : new FormControl('',Validators.required),
    oldpass : new FormControl('',Validators.required)
})

  ngOnInit() {
  }

  save(formData)
  {
    
     this.http.post('/user/forgot/password',formData.value)
     .subscribe(data => {});
     this.router.navigateByUrl('/');
  }

}
