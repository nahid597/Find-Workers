import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-compont-vii',
  templateUrl: './customer-compont-vii.component.html',
  styleUrls: ['./customer-compont-vii.component.css']
})
export class CustomerCompontVIIComponent implements OnInit {

 

  report = new FormGroup({

    title : new  FormControl('',Validators.required),
    message : new FormControl('',Validators.required)

  })
  constructor(private http : HttpClient,private router : Router) { }

  ngOnInit() {
  }

  save(formData)
  {
     //console.log(formData.value);
     this.http.post('/admin/complain',formData.value)
     .subscribe(data => {});
     this.router.navigateByUrl('/');
  }

}
