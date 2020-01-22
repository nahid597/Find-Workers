import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-worker-complain',
  templateUrl: './worker-complain.component.html',
  styleUrls: ['./worker-complain.component.css']
})
export class WorkerComplainComponent implements OnInit {

  constructor(private http : HttpClient,private router : Router) { }

  ngOnInit() {
  }

   report = new FormGroup({

    title : new FormControl('',Validators.required),
    message : new FormControl('',Validators.required)
})

  save(formData)
  {
     this.http.post('admin/worker/complain',formData.value)
     .subscribe(data => {

     });

     this.router.navigateByUrl('/');
  }

}
