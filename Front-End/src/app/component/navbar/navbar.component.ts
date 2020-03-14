import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy, DoCheck {

  selectedIndex: number = null;
  private active;
  private show = false;
  private userAuthenticated = false;
  private isAdmin = false;
  private userId: any;
  private IsWorker = false;
  private ob: any;
  private isStatus = false;
  private put: any;
  private X: any;
  private Y: any;
  private getUrl = 'http://192.168.0.120:4444/admin/workers?_id=';
  private updateUrl = 'http://192.168.0.120:4444/admin/workers/update';
  t = 24.23344;
  p = 88.23434;
  private authListerSubs: Subscription;

  constructor(private authService: LoginService) {}

  ngOnInit() {

    // this.collback();
    this.authListerSubs = this.authService.getAuthStatus()
    .subscribe(isAuthenticated => {
        // this.collback();
    });

    console.log(this.IsWorker);
    // if (this.IsWorker) {
    setInterval(() => {
      if (navigator.geolocation) {
        // this.isTracking = true;
        navigator.geolocation.getCurrentPosition((position) => {
          console.log('in geo');
          console.log('position ', position);
          if (this.IsWorker) {
            this.ob = {
              _id: this.userId.userId._id,
              Coordinate: {
                x: position.coords.latitude,
                y: position.coords.longitude
              }
            };
            console.log(this.ob);
            this.authService.updateWorker(this.ob, this.updateUrl, this.getUrl);
          }
        });

        // this.t = this.t + 0.001;
        // this.p = this.p + 0.001;

        // this.ob = {
        //   _id: this.userId.userId._id,
        //     Coordinate: {
        //       x: this.t,
        //       y: this.p
        //     }
        // };
        // if (this.IsWorker) {
        //   console.log(this.ob);
        // }
        // this.authService.updateWorker(this.ob, this.updateUrl, this.getUrl);
      } else {
        console.log('error');
        alert('Geolocation is not supported by this browser.');
      }
    }, 5000);
    // }
  }

  // collback() {
  //   setTimeout(() => {
  //     this.isStatus = this.authService.isStatus();
  //   }, 500);

  //   setTimeout(() => {
  //     this.IsWorker = this.authService.isWorrker();
  //   }, 200);
  //   this.userAuthenticated = this.authService.isAuth();
  //   this.isAdmin = this.authService.isAdmin();

  //   this.userId = this.authService.getUserId();

  //   console.log(this.isStatus);

  //   console.log(this.userAuthenticated);
  // }

  ngDoCheck() {
    this.isStatus = this.authService.isStatus();
    this.IsWorker = this.authService.isWorrker();
    this.userAuthenticated = this.authService.isAuth();
    this.isAdmin = this.authService.isAdmin();
    this.userId = this.authService.getUserId();
  }

  onLogout() {
    console.log('logout');
    this.ob = {
      _id: this.userId.userId._id,
      Active_status: false
    };
    this.authService.updateWorker(this.ob, this.updateUrl, this.getUrl);
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
    // setTimeout(() => {
    this.ob = {
      _id: this.userId.userId._id,
      Active_status: event.target.checked,
      Coordinate: {
        x: this.X,
        y: this.Y
      }
    };
    console.log('ob ', this.ob);

    this.authService.updateWorkerStatus(this.ob, this.updateUrl, this.getUrl);
    // }, 10);

  }

  // showToggle() {
  //   this.active = document.getElementsByClassName('active');
  //   this.active.classList.add = 
  // }

  setIndex(index: number) {
    this.selectedIndex = index;
    console.log(this.selectedIndex);
    this.active = document.getElementById('active');
    this.active.classList.add('activelink');
 }

  showFlip() {
    this.show = !this.show;
  }

  ngOnDestroy() {
      this.authListerSubs.unsubscribe();
  }

}
