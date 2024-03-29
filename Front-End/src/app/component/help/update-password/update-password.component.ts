import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  constructor(private http : HttpClient,private router : Router) { }

    updatepassword = new FormGroup({
    
    Phone_number : new FormControl('',Validators.required),
    Oldpassword : new FormControl('',Validators.required),
    Newpass : new FormControl('',Validators.required),
    RetypeNewpassword : new FormControl('',Validators.required)
})
  ngOnInit() {
  }

  save(formData)
  {
       this.http.put('http://localhost:4444/user/password/update',formData.value)
       .subscribe(data => {
         console.log(data);
       });
       this.router.navigateByUrl('/login');
  }

}
