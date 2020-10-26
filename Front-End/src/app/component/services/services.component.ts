import { Component, OnInit, DoCheck } from '@angular/core';
import { CategoryService } from '../../service/category.service';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../service/login.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit, DoCheck {

  arr: any[] = ['dfdkf', 'dfdfd' , 'dfdfd' , 'dfdfd' , 'dfdfd' , 'dfdfd' , 'dfdfd' , 'dfdfd' , 'dfdfd' , 'dfdfd' , 'dfdfd'];
  categoryWorker;
  userr;
  user;
  href;
  private authListerSubs: Subscription;

  constructor(private router: Router, private auth: LoginService, private category: CategoryService, private http: HttpClient) { }

  ngOnInit() {
    console.log('category not working');
    this.http.get(this.auth.getServerRoute() + '/admin/category/get')
    .subscribe(response => {
      console.log(response);
      this.categoryWorker = response;
      this.categoryWorker.forEach(element => {
        console.log(element);
      });
    });
    this.authListerSubs = this.auth.getAuthStatus()
    .subscribe(isAuthenticated => {
      // this.userr = this.auth.getUserId();
      // this.user = this.userr.userId._id;
    });
  }


  ngDoCheck() {
    this.user = this.auth.getUserId();
    console.log(this.user);
  }

  navigateUrl(data) {
    if (!this.user) {
      this.router.navigate(['/login']);
    } else {
      this.href = 'http://127.0.0.1:4444/admin/workers?Active_status=true&Category=' + data;
      location.href = this.href;
    }
  }

  selectcat(event) {
    this.category.passData(event);
  }
}
