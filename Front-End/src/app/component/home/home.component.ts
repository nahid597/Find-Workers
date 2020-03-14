import { Component, OnInit, DoCheck } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, DoCheck {

  images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);
  userr;
  user;
  href;
  private isComplete = false;
  private authListerSubs: Subscription;

  constructor(private auth: LoginService, private router: Router) { }

  ngOnInit() {
    // setTimeout(() => {
     // this.userr = this.auth.getUserId();
     // this.user = this.userr.userId._id;
    // }, 500);
    this.authListerSubs = this.auth.getAuthStatus()
    .subscribe(isAuthenticated => {
      // this.userr = this.auth.getUserId();
      // this.user = this.userr.userId._id;
    });

    // if (this.isComplete) {
    //   window.alert('Successfully registered');
    // }
  }


  ngDoCheck() {
    this.user = this.auth.getUserId();
    console.log(this.user);
    this.isComplete = this.auth.isComplete();
  }

  navigateUrl() {
    if (!this.user) {
      this.router.navigate(['/login']);
    } else {
      this.href = 'http://192.168.0.122:4487/map/map.component.html?_id=' + this.user.userId._id;
      location.href = this.href;
    }
  }

  navigateUrlByCategory(data) {
    if (!this.user) {
      this.router.navigate(['/login']);
    } else {
      this.href = 'http://127.0.0.1:4444/map/map.component.html?_id=' + this.user.userId._id + '&Category=' + data;
      location.href = this.href;
    }
  }

}
