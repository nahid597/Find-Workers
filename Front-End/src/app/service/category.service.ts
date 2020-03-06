import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient , private router: Router) {}

  passData(event) {
    this.http.post('http://192.168.0.107:4444/admin/category/post' , event)
    .subscribe(response => {
      console.log(response);
      if (response) {
        this.router.navigate(['/']);
      }
    });
  }

  getCategory() {
    this.http.get('http://192.168.0.107:4444/admin/category/get')
    .subscribe(response => {
      return response;
    });
    return 3;
  }
}
