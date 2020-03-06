import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-phone-number-update-worker',
  templateUrl: './phone-number-update-worker.component.html',
  styleUrls: ['./phone-number-update-worker.component.css']
})
export class PhoneNumberUpdateWorkerComponent implements OnInit {

  constructor(private http : HttpClient,private router : Router) { }
  updatenumber = new FormGroup({

      OldNumber : new FormControl('',Validators.required),
      NewNumber : new FormControl('',Validators.required)
  })

  ngOnInit() {
  }

  save(formData)
  {
      this.http.put('http://localhost:4444/worker/phone-number/update', formData.value)
      .subscribe(data => {
           
        console.log(data);
      });
      this.router.navigateByUrl('/login');
  }

}
