import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { AuthData } from '../component/auth-data.model';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private durationTimer: any;
  private isAuthenticated = false;
  private  token: string;
  private userId: string;
  private authStatus = new Subject<boolean>();
  obj: {};

    constructor(private http: HttpClient , private router: Router) {}

    getToken() {
        return this.token;
    }

    getAuthStatus() {
        return this.authStatus.asObservable();
    }

    isAuth() {
        return this.isAuthenticated;
    }

    getUserId() {
        return this.userId;
    }

    createUser(authData) {
      console.log(authData);
      this.http.post('http://127.0.0.1:4444/admin/workers/signup' , authData)
      .subscribe((response) => {
        console.log('response in createuser ' + response);
        this.router.navigate(['/']);
        // console.log(response);
      }, error => {
          this.authStatus.next(false);
      });
    }

    login(authData) {
        console.log(authData);
        // const authData: AuthData = {email: email,  password: password}
        this.http.post<{token: string , expiresIn: number, userId: string}>('http://127.0.0.1:4444/admin/workers/login' , authData)
        .subscribe(response => {
            console.log('vallagena');
            console.log('token print ' + response.token);
            const obj = JSON.stringify(response);
            const objj = JSON.parse(obj);
            console.log('response ' + objj);
            const token = obj;

            this.token = token;
            // console.log(JSON.parse(response));
            if (token) {
              console.log('token ' + token);
              const expireInDuration = response.expiresIn;
              // this.durationTimer = setTimeout(() => {
                // this.logout();
              // }, expireInDuration * 1000);
              localStorage.setItem('flag', JSON.stringify(true));
              this.isAuthenticated = JSON.parse(localStorage.getItem('flag'));

              console.log('check local ' + this.isAuthenticated);
              this.userId = response.userId;
              this.authStatus.next(true);
              const now = new Date();
              const expirationDate = new Date( now.getTime() + expireInDuration * 1000);
              // console.log(expirationDate);
              this.saveAuthDataInLocalStorage(token, expirationDate, this.userId );
              console.log('navigate');
              this.router.navigate(['/']);
            }
        }, error => {
            console.log('baler error found');
            this.authStatus.next(false);
        });
    }

    autoAuthUser() {
      const authInformation =  this.getAUthData();
      if (!authInformation) {
          return;
      }
      const now = new Date();
      const expiresIn = authInformation.expirationDate.getTime() - now.getTime();

      if (expiresIn > 0) {
          this.token = authInformation.token;
          this.isAuthenticated = true;
          this.userId = authInformation.userId;
          this.setAuthTimer(expiresIn / 1000);
          this.authStatus.next(true);
      }
    }

    private setAuthTimer(duration: number) {
       // console.log("setting time: " + duration);
        this.durationTimer = setTimeout(() => {
            this.logout();
       }, duration * 1000);
    }

    logout() {
        this.token = null;
        this.isAuthenticated = false;
        this.authStatus.next(false);
        clearTimeout(this.durationTimer);
        this.clearAuthDataInLocalStorage();
        this.userId = null;
        this.router.navigate(['/']);
    }

    private saveAuthDataInLocalStorage(token: string, expiretionDate: Date, userId: string) {
        localStorage.setItem('token', token);
        localStorage.setItem('expire', expiretionDate.toISOString());
        localStorage.setItem('userId', userId);
    }

    private clearAuthDataInLocalStorage() {
        localStorage.removeItem('token');
        localStorage.removeItem('expire');
        localStorage.removeItem('userId');
    }

    private getAUthData() {
        const token = localStorage.getItem('token');
        const expirationDate = localStorage.getItem('expire');
        const userId = localStorage.getItem('userId');

        if (!token || !expirationDate) {
            return;
        }

        return {
            token: token,
            expirationDate: new Date(expirationDate),
            userId: userId
        };
    }
}
