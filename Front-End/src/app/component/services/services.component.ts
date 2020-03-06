import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../service/category.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  arr: any[] = ['dfdkf', 'dfdfd' , 'dfdfd' , 'dfdfd' , 'dfdfd' , 'dfdfd' , 'dfdfd' , 'dfdfd' , 'dfdfd' , 'dfdfd' , 'dfdfd'];
  categoryWorker;

  constructor(private category: CategoryService, private http: HttpClient) { }

  ngOnInit() {
    this.http.get('http://192.168.0.107:4444/admin/category/get')
    .subscribe(response => {
      console.log(response);
      this.categoryWorker = response;
      this.categoryWorker.forEach(element => {
        console.log(element);
      });
    });
  }

  selectcat(event) {
    this.category.passData(event);
  }

}
