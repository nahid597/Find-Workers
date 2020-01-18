import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile;

  constructor(private auth: LoginService) { }

  ngOnInit() {
    this.profile = this.auth.getUserId();
    console.log(this.profile.userId.Name);
  }

}
