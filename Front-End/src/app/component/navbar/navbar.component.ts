import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  passwordCheck: any;
  loginButton: any;

  constructor(private lg: LoginService) {
    this.passwordCheck = lg.passwordCheck;
    this.loginButton = lg.loginButton;
  }

}
