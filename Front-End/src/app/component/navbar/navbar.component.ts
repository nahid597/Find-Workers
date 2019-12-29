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
  private authListerSubs: Subscription;

  constructor(private authService: LoginService) {}

  ngOnInit() {
    this.userAuthenticated = this.authService.isAuth();
    this.authListerSubs = this.authService.getAuthStatus()
    .subscribe(isAuthenticated => {
        this.userAuthenticated = JSON.parse(localStorage.getItem('flag'));
        console.log('user authenticated ' + this.userAuthenticated);
    });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
      this.authListerSubs.unsubscribe();
  }

}
