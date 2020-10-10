import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  user: any;

  constructor(private auth: LoginService, private router: Router) { }

  canActivate(route, state: RouterStateSnapshot) {
    this.user = this.auth.getUserId();
    console.log(this.user);
    if (this.user.userId._id) {
      return true;
    }

    this.router.navigate(['login'], { queryParams: {returnUrl: state.url} });
    return false;
  }
}
