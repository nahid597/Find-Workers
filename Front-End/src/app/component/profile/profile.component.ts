import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any;
  href: any;
  profile: any;
  private authListerSubs: Subscription;

  constructor(private authService: LoginService, private router: Router) { }

  ngOnInit() {

    setTimeout(() => {
      this.profile = this.authService.getUserId();
      this.user = this.profile.userId._id;
    }, 200);

    this.authListerSubs = this.authService.getAuthStatus()
    .subscribe(isAuthenticated => {
        this.profile = this.authService.getUserId();
        console.log(this.profile.userId.Name);
    });

  }

  goToWorkerMap(){

      this.href = 'http://127.0.0.1:4444/workermap/workermap.component.html?_id=' + this.user;
      location.replace(this.href);
  }

}
