import { Component, OnInit, DoCheck } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { Subscription } from 'rxjs';
// import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  // providers: [NgbRatingConfig]
})
export class ProfileComponent implements OnInit, DoCheck {

  profile: any;
  private authListerSubs: Subscription;
  private id;
  ratepoint;
  status;
  workerCategory;

  constructor(private authService: LoginService) {
    // customize default values of ratings used by this component tree
    // config.max = 5;
    // config.readonly = true;
  }

  ngOnInit() {

    // setTimeout(() => {
    this.profile = this.authService.getUserId();
    this.workerCategory = this.profile.userId.Category;
    this.id = this.profile.userId._id;
    this.ratepoint = this.profile.userId.Rating.rating;
    this.status = this.authService.isStatus();
    // this.ctrl.disable();
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
      this.ratepoint = this.profile.userId.Rating.rating;
      this.workerCategory = this.profile.userId.Category;
      console.log(this.ratepoint);
      console.log(this.profile.userId.IsWorker);
    }
  }

}
