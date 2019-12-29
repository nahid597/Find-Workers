import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient , private router: Router) { }

  passData(event) {
    this.http.post('http://127.0.0.1:4444/admin/workers/signup' , event)
    .subscribe(response => {
      console.log(response);
      if (response) {
        this.router.navigate(['/']);
      }
    });
  }
}
