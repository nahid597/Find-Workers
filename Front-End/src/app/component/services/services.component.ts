import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../service/category.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  arr: any[] = ['dfdkf', 'dfdfd' , 'dfdfd' , 'dfdfd' , 'dfdfd' , 'dfdfd' , 'dfdfd' , 'dfdfd' , 'dfdfd' , 'dfdfd' , 'dfdfd'];

  constructor(private category: CategoryService) { }

  ngOnInit() {
  }

  selectcat(event) {
    this.category.passData(event);
  }

}
