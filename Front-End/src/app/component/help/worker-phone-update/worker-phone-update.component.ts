import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-worker-phone-update',
  templateUrl: './worker-phone-update.component.html',
  styleUrls: ['./worker-phone-update.component.css']
})
export class WorkerPhoneUpdateComponent implements OnInit {

  constructor(private http : HttpClient,private router : Router) { }

  form = new FormGroup({

      Phone : new FormControl('', Validators.required),
      Message : new FormControl('',Validators.required)
  });

  ngOnInit() {
  }


  save(formData)
  {
     
     this.http.post('worker/phone-number-update',formData.value)
     .subscribe(data => {

     });

     this.router.navigateByUrl('/');
  }

}
