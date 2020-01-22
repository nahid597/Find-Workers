import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customercomponent-iv',
  templateUrl: './customercomponent-iv.component.html',
  styleUrls: ['./customercomponent-iv.component.css']
})
export class CustomercomponentIVComponent implements OnInit {
   
  form = new FormGroup({
    Phone : new FormControl('',Validators.required),
    Message : new FormControl('',Validators.required)
  })
  constructor(private http : HttpClient,private router : Router) { }

  save(formData)
  {
    
     this.http.post('admin/update/complain',formData.value)
     .subscribe(data => {});
     this.router.navigateByUrl('/');
  }

  ngOnInit() {
  }

}
