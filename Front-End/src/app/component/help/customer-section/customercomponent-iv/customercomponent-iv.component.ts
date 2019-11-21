import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
  constructor() { }

  save(formData)
  {
     console.log(formData.value.Phone);
     console.log(formData.value.Message)
  }

  ngOnInit() {
  }

}
