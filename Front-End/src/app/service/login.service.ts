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
  private isWorker = false;
  private isAadmin = false;
  private  token: string;
  private userId;
  private id;
  private idd: any;
  private _id: any;
  private status = false;
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

    isAdmin() {
        return this.isAadmin;
    }

    isStatus() {
        return this.status;
    }

    isWorrker() {
        return this.isWorker;
    }

    getUserId() {
        return this.userId;
    }

    createWorker(authData) {
        this.http.post('http://127.0.0.1:4444/admin/workers/signup' , authData)
        .subscribe((response) => {
            this.router.navigate(['/']);
        }, error => {
            this.authStatus.next(false);
        });
    }

    updateWorker(authData) {
        this.http.put<any>('http://127.0.0.1:4444/admin/workers/update' , authData)
        .subscribe((response) => {
            console.log(response);
            if (response.Phone) {
                this._id = {
                    _id: this.id
                };
                this.http.post('http://127.0.0.1:4444/admin/workers/get', this._id)
                .subscribe(res => {
                    this.userId = res;
                    console.log(res);
                });
            }
            this.router.navigate(['/profile']);
        }, error => {
            this.authStatus.next(false);
        });
    }

    updateWorkerStatus(authData) {
        this.http.put<any>('http://127.0.0.1:4444/admin/workers/updatestatus' , authData)
        .subscribe((response) => {
            console.log(response);
            if (response.Phone) {
                this._id = {
                    _id: this.id
                };
                this.http.post('http://127.0.0.1:4444/admin/workers/get', this._id)
                .subscribe(res => {
                    this.userId = res;
                    console.log(res);
                });
            }
        }, error => {
            this.authStatus.next(false);
        });
    }

    createUser(authData) {
        this.http.post('http://127.0.0.1:4444/admin/users/signup' , authData)
        .subscribe((response) => {
            this.router.navigate(['/']);
        }, error => {
            this.authStatus.next(false);
        });
    }

    workerLogin(authData) {
        this.http.post<{token: string , expiresIn: number, userId: any}>('http://127.0.0.1:4444/admin/workers/login' , authData)
        .subscribe(response => {
            this.id = response.userId._id;
            console.log(this.id);
            this.callbackFunction(response);
        }, error => {
            this.authStatus.next(false);
        });
        return this.check;
    }

    userLogin(authData) {
        this.http.post<{token: string , expiresIn: number, userId: any}>('http://127.0.0.1:4444/admin/users/login' , authData)
        .subscribe(response => {
            this.id = response.userId._id;
            console.log(this.id);
            this.callbackFunction(response);
        }, error => {
            this.authStatus.next(false);
        });
        return this.check;
    }

    callbackFunction(response) {

        const token = response.token;

        if (token) {
            const expireInDuration = response.expiresIn;
            this.durationTimer = setTimeout(() => {
                 this.logout();
            }, expireInDuration * 1000);

            this.isAuthenticated = true;
            this.userId = response;
            this.isWorker = response.userId.IsWorker;
            this.isAadmin = response.userId.IsAdmin;
            this.status = response.userId.Active_status;
            this.authStatus.next(true);
            const now = new Date();
            const expirationDate = new Date( now.getTime() + expireInDuration * 1000);
            this.saveAuthDataInLocalStorage(token, expirationDate, this.userId );
            this.check = true;
            let returnUrl = localStorage.getItem('returnUrl');
            this.router.navigate([returnUrl]);
        }
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
          this.isWorker = authInformation.userId.userId.IsWorker;
          this.isAadmin = authInformation.userId.userId.IsAdmin;
          // this.status = authInformation.userId.userId.Active_status;
          console.log(this.isWorker);
          this.userId = authInformation.userId;
          console.log(this.userId);
          this.setAuthTimer(expiresIn / 1000);
          this.authStatus.next(true);

          this.idd = {
              _id: this.userId.userId._id
          };

          if (this.isWorker) {

            this.http.post<{userId: any}>('http://127.0.0.1:4444/admin/workers/get', this.idd)
                .subscribe(res => {
                    this.status = res.userId.Active_status;
                    console.log(this.status);
                });
          }
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
        this.isWorker = false;
        this.isAadmin = false;
        this.authStatus.next(false);
        clearTimeout(this.durationTimer);
        this.clearAuthDataInLocalStorage();
        this.userId = null;
        this.router.navigate(['/']);
    }

    private saveAuthDataInLocalStorage(token: string, expiretionDate: Date, userId: any) {
        localStorage.setItem('token', token);
        localStorage.setItem('expire', expiretionDate.toISOString());
        localStorage.setItem('userId', JSON.stringify(userId));
        // let parse = JSON.parse(localStorage.getItem('userId'));
        // console.log(parse);
    }

    private clearAuthDataInLocalStorage() {
        localStorage.removeItem('token');
        localStorage.removeItem('expire');
        localStorage.removeItem('userId');
    }

    private getAUthData() {
        const token = localStorage.getItem('token');
        const expirationDate = localStorage.getItem('expire');
        const userId = JSON.parse(localStorage.getItem('userId'));

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
