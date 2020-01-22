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
  private authListerSubs: Subscription;

  constructor(private authService: LoginService) {}

  ngOnInit() {
    this.userAuthenticated = this.authService.isAuth();

    this.authListerSubs = this.authService.getAuthStatus()
    .subscribe(isAuthenticated => {
        this.userAuthenticated = isAuthenticated;
        console.log('user authenticated ' + this.userAuthenticated);
        this.userId = this.authService.getUserId();
        this.user = this.userId.userId.IsAdmin;
        console.log(this.user);
    });
  }

  onLogout() {
    console.log('logout');
    this.authService.logout();
    this.user = false;
  }

  ngOnDestroy() {
      this.authListerSubs.unsubscribe();
  }

}
