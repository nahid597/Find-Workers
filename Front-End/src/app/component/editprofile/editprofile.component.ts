import { Component } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent {

  saveNumber;
  saveData;

  constructor(private ls: LoginService, private httpClint: HttpClient) {
    if (this.saveNumber) {
      this.httpClint.get('http://127.0.0.1:4444/admin/workers?Phone=' + this.saveNumber)
      .subscribe(data => {
        console.log(data);
        this.saveData = data[0];
      });
    }
  }

  updateProfile(formValue) {
    // this.ls.updateProfile(formValue);
  }
}
