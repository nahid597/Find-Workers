import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-phone-number-update',
  templateUrl: './phone-number-update.component.html',
  styleUrls: ['./phone-number-update.component.css']
})
export class PhoneNumberUpdateComponent implements OnInit {

  constructor(private http : HttpClient,private router : Router) { }
  updatenumber = new FormGroup({

      OldNumber : new FormControl('',Validators.required),
      NewNumber : new FormControl('',Validators.required)
  })
  ngOnInit() {
  }

  save(formData)
  {
      this.http.put('http://localhost:4444/user/phone-number/update', formData.value)
      .subscribe(data => {
          console.log(data);
      });
      this.router.navigateByUrl('/login');
  }

}
