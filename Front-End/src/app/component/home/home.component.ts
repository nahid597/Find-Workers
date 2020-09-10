import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);
  userr;
  user;
  href;

  constructor(private auth: LoginService, private router: Router) { }

  ngOnInit() {
    this.userr = this.auth.getUserId();
    this.user = this.userr.userId._id;
  }

  navigateurl() {
    if (!this.user) {
      this.router.navigate(['/login']);
    } else {
      this.href = 'http://127.0.0.1:4444/map/map.component.html?_id=' + this.user + '&_category=1';

      location.replace(this.href);
    }
  }

  currentButton(_category: any){
    if(!this.user)
    {
       this.router.navigate(['/login']);
    }
    else
    {
      this.href = 'http://127.0.0.1:4444/map/map.component.html?_id=' + this.user + '&_category='+_category;
      location.replace(this.href);
    }
  }

  ViclesButton(_category:any)
  {
    if(!this.user)
    {
       this.router.navigate(['/login']);
    }
    else
    {
      this.href = 'http://127.0.0.1:4444/map/map.component.html?_id=' + this.user + '&_category='+_category;
      location.replace(this.href);
    }
  }

  gasStoveButton(_category:any)
  {
    if(!this.user)
    {
       this.router.navigate(['/login']);
    }
    else
    {
      this.href = 'http://127.0.0.1:4444/map/map.component.html?_id=' + this.user + '&_category='+_category;
      location.replace(this.href);
    }
  }

  waterlineButton(_category:any)
  {
    if(!this.user)
    {
       this.router.navigate(['/login']);
    }
    else
    {
      this.href = 'http://127.0.0.1:4444/map/map.component.html?_id=' + this.user + '&_category='+_category;
      location.replace(this.href);
    }
  }

}