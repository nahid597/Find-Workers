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
  isAdmin = false;
  userId: any;
  IsWorker = false;
  ob: any;
  isStatus = false;
  put: any;
  X: any;
  Y: any;
  private authListerSubs: Subscription;

  constructor(private authService: LoginService) {}

  ngOnInit() {
    setTimeout(() => {
      this.isStatus = this.authService.isStatus();
    }, 500);
    this.userAuthenticated = this.authService.isAuth();
    this.isAdmin = this.authService.isAdmin();
    this.IsWorker = this.authService.isWorrker();
    this.userId = this.authService.getUserId();

    console.log(this.isStatus);

    console.log(this.userAuthenticated);

    this.authListerSubs = this.authService.getAuthStatus()
    .subscribe(isAuthenticated => {
        this.userAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
        this.IsWorker = this.userId.userId.IsWorker;
        this.isAdmin = this.userId.userId.IsAdmin;
        setTimeout(() => {
          this.isStatus = this.authService.isStatus();
        }, 500);
        console.log('worker ' + this.isStatus);
    });

    console.log(this.IsWorker);

    setInterval(() => {
      if (navigator.geolocation) {
        // this.isTracking = true;
        navigator.geolocation.getCurrentPosition((position) => {
          console.log('position ', position);
          if (this.IsWorker) {
            this.ob = {
              _id: this.userId.userId._id,
              Coordinate: {
                x: position.coords.latitude,
                y: position.coords.longitude
              }
            };
            this.authService.updateWorkerStatus(this.ob);
          }
        });
      } else {
        alert('Geolocation is not supported by this browser.');
      }
    }, 5000);
  }

  onLogout() {
    console.log('logout');
    this.ob = {
      _id: this.userId.userId._id,
      Active_status: false
    };
    this.authService.updateWorkerStatus(this.ob);
    this.authService.logout();
  }

  toggleEditable(event) {

    if (navigator.geolocation) {
      // this.isTracking = true;
      navigator.geolocation.getCurrentPosition((position) => {
        // console.log(position);
        this.X = position.coords.latitude;
        this.Y = position.coords.longitude;
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
    setTimeout(() => {
      this.ob = {
        _id: this.userId.userId._id,
        Active_status: event.target.checked,
        Coordinate: {
          x: this.X,
          y: this.Y
        }
      };
      console.log('ob ', this.ob);

      this.authService.updateWorkerStatus(this.ob);
    }, 10);

  }

  ngOnDestroy() {
      this.authListerSubs.unsubscribe();
  }

}
