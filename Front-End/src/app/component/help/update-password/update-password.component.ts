import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  constructor() { }

  updatepassword = new FormGroup({

    Oldpassword : new FormControl('',Validators.required),
    Newpass : new FormControl('',Validators.required),
    RetypeNewpassword : new FormControl('',Validators.required)
})
  ngOnInit() {
  }

}
