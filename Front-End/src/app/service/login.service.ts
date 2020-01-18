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
  private userId;
  private authStatus = new Subject<boolean>();
  check = false;
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
        this.http.post('http://127.0.0.1:4444/admin/workers/signup' , authData)
        .subscribe((response) => {
            this.router.navigate(['/']);
        }, error => {
            this.authStatus.next(false);
        });
    }

    login(authData) {
        this.http.post<{token: string , expiresIn: number, userId: any}>('http://127.0.0.1:4444/admin/workers/login' , authData)
        .subscribe(response => {
            const token = response.token;

            if (token) {
                const expireInDuration = response.expiresIn;
                this.durationTimer = setTimeout(() => {
                     this.logout();
                }, expireInDuration * 1000);

                this.isAuthenticated = true;
                this.userId = response;
                this.authStatus.next(true);
                const now = new Date();
                const expirationDate = new Date( now.getTime() + expireInDuration * 1000);
                this.saveAuthDataInLocalStorage(token, expirationDate, this.userId );
                this.check = true;
                let returnUrl = localStorage.getItem('returnUrl');
                this.router.navigate([returnUrl]);
            }
        }, error => {
            this.authStatus.next(false);
        });
        return this.check;
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
