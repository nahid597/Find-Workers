import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-phone-number-update',
  templateUrl: './phone-number-update.component.html',
  styleUrls: ['./phone-number-update.component.css']
})
export class PhoneNumberUpdateComponent implements OnInit {

  constructor() { }
  updatenumber = new FormGroup({

      OldNumber : new FormControl('',Validators.required),
      NewNumber : new FormControl('',Validators.required)
  })
  ngOnInit() {
  }

}
