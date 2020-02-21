import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: any;
  private authListerSubs: Subscription;
  private id;

  constructor(private authService: LoginService) { }

  ngOnInit() {

    setTimeout(() => {
      this.profile = this.authService.getUserId();
      this.id = this.profile.userId._id;
    }, 200);

    this.authListerSubs = this.authService.getAuthStatus()
    .subscribe(isAuthenticated => {
        this.profile = this.authService.getUserId();
        console.log(this.profile.userId.Name);
    });

  }

}
