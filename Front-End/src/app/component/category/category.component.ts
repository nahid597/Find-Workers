import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../service/category.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  product = {};

  constructor(private category: CategoryService, private http: HttpClient) { }

  ngOnInit() {
  }

  save(value) {
    this.category.passData(value);
    console.log(value);
  }

}
