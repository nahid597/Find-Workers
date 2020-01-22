import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  userAuthenticated = false;
  user = false;
  userId: any;
  ob: any;
  private authListerSubs: Subscription;

  constructor(private authService: LoginService) {}

  ngOnInit() {
    this.userAuthenticated = this.authService.isAuth();

    this.userId = this.authService.getUserId();
    this.user = this.userId.userId.IsAdmin;
    console.log(this.user);

    this.authListerSubs = this.authService.getAuthStatus()
    .subscribe(isAuthenticated => {
        this.userAuthenticated = isAuthenticated;
        console.log('user authenticated ' + this.userAuthenticated);
    });
  }

  onLogout() {
    console.log('logout');
    this.authService.logout();
    this.user = false;
  }

  toggleEditable(event) {
    this.ob = {
      _id: this.userId.userId._id,
      Active_status: event.target.checked
    };
    this.authService.updateWorkerStatus(this.ob);
  }

  ngOnDestroy() {
      this.authListerSubs.unsubscribe();
  }

}
