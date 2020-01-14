import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
  constructor() { }

  ngOnInit() {
  }

}
