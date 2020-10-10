import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient , private router: Router, private authService: LoginService) {}

  passData(event) {
    this.http.post(this.authService.getServerRoute() + '/admin/category/post' , event)
    .subscribe(response => {
      console.log(response);
      if (response) {
        this.router.navigate(['/']);
      }
    });
  }


  getCategory() {
    this.http.get(this.authService.getServerRoute() + '/admin/category/get')
    .subscribe(response => {
      return response;
    });
    return 3;
  }
}
