import { Component, OnInit, DoCheck } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, DoCheck {

  profile: any;
  private authListerSubs: Subscription;
  private id;
  rate = 0;
  status;

  constructor(private authService: LoginService) { }

  ngOnInit() {

    // setTimeout(() => {
    this.profile = this.authService.getUserId();
    this.id = this.profile.userId._id;
    this.rate = this.profile.userId.Rating.rating;
    this.status = this.authService.isStatus();
    // }, 200);

    this.authListerSubs = this.authService.getAuthStatus()
    .subscribe(isAuthenticated => {
        // this.profile = this.authService.getUserId();
        console.log(this.profile.userId.Name);
    });

  }

  ngDoCheck() {
    this.profile = this.authService.getUserId();
    console.log(this.profile);
    console.log(this.profile.userId.IsWorker);
    this.id = this.profile.userId._id;
    if (this.profile.userId.IsWorker) {
      this.status = this.authService.isStatus();
      console.log(this.status);
      this.rate = this.profile.userId.Rating.rating;
      console.log(this.rate);
      console.log(this.profile.userId.IsWorker);
    }
  }

}
