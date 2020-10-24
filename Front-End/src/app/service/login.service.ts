import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { AuthData } from '../component/auth-data.model';
import { RouteService } from './route.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private complete = false;
  private durationTimer: any;
  private isAuthenticated = false;
  private isWorker = false;
  private isAadmin = false;
  private  token: string;
  private userId;
  private id;
  private idd: any;
  private ob;
  private _id: any;
  private status = false;
  private serverRout;
  private updateUrl;
  private getUrl;
  private userpath;
  private workerpath;
  private workerregister;
  private userregister;
  private authStatus = new Subject<boolean>();
  private expireInDuration;
  private error = false;
  private err = false;
  check = true;
  identity: any;
  obj: {};

    constructor(private http: HttpClient , private router: Router, route: RouteService) {
        this.serverRout = route.serverRout;
        this.updateUrl = route.updateUrl;
        this.getUrl = route.getUrl;
        this.userpath = route.userpath;
        this.workerpath = route.workerpath;
        this.workerregister = route.workerregister;
        this.userregister = route.userregister;
    }

    getServerRoute() {
        return this.serverRout;
    }

    isComplete() {
        return this.complete;
    }

    isError() {
        return this.error;
    }

    isErr() {
        return this.err;
    }

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

    getCheck() {
        return this.check;
    }

    setCheck(value) {
        this.check = value;
    }

    getUser(id, url) {
        return this.http.get(url + id);
    }

    setUserIdentity(identity) {
        this.identity = identity;
    }

    getUserIdentity() {
        return this.identity;
    }

    // for update worker data

    updateWorkerPosition(authData, updateUrl) {
        console.log(authData);
        console.log(authData);
        this.http.put<any>(updateUrl , authData)
        .subscribe((response) => {
            console.log(response);
            console.log(response[0]);
            if (response[0]._id) {
                console.log(response[0]._id);
                this.userId = {
                    userId: response[0]
                };
                console.log(this.userId);
                this._id = {
                    _id: response._id
                };

                this.err = false;

                localStorage.setItem('userId', JSON.stringify(this.userId));
                console.log(this._id);
            }
        }, error => {
            this.authStatus.next(false);
            this.err = true;
        });
    }

    updateWorker(authData, updateUrl) {
        console.log(authData);
        console.log(authData);
        this.http.put<any>(updateUrl , authData)
        .subscribe((response) => {
            console.log(response);
            console.log(response[0]);
            if (response[0]._id) {
                console.log(response[0]._id);
                this.userId = {
                    userId: response[0]
                };
                this.router.navigate(['/profile']);
                alert('Successfully updated...');
                console.log(this.userId);
                this._id = {
                    _id: response._id
                };

                this.err = false;

                localStorage.setItem('userId', JSON.stringify(this.userId));
                console.log(this._id);
            }
        }, error => {
            this.authStatus.next(false);
            this.err = true;
        });
    }


    updateWorkerStatus(authData, updateUrl) {
        console.log(authData);
        console.log(authData);
        this.http.put<any>(updateUrl , authData)
        .subscribe((response) => {
            console.log(response);
            console.log(response[0]);
            if (response[0]._id) {
                console.log(response[0]._id);
                this.userId = {
                    userId: response[0]
                };
                this.status = this.userId.userId.Active_status;
                this.userId.userId.Active_status = this.status;
                localStorage.setItem('userId', JSON.stringify(this.userId));
                console.log(this.userId);
                this._id = {
                    _id: response._id
                };
                console.log(this._id);
            }
        }, error => {
            this.authStatus.next(false);
        });
    }

    // new worker creating

    createWorker(authData) {
        this.register(this.workerregister, authData);
    }

    // new user creating
    createUser(authData) {
        this.register(this.userregister, authData);
    }

    // register function common for both user and worker

    register(path: string, authData) {
        console.log(path);
        this.http.post<{complete, result, error}>(path , authData)
        .subscribe((response) => {
            console.log('hhhpath');
            console.log(response.error);
            if (response.error) {
                this.error = true;
            } else {
                console.log(response);
                this.complete = true;
                this.router.navigate(['/']);
                alert('Successfully registered...');
            }
        }, error => {
            this.authStatus.next(false);
        });
    }

    // worker login function

    workerLogin(authData) {
        return this.login(this.workerpath, authData);
    }

    // user login function
    userLogin(authData) {
        return this.login(this.userpath, authData);
    }

    // login function for both user and worker

    login(path: string, authData) {
        this.http.post<{token: string , expiresIn: number, userId: any}>(path , authData)
        .subscribe(response => {
            this.id = response.userId._id;
            console.log(this.id);
            this.callbackFunction(response);
        }, error => {
            this.authStatus.next(false);
            this.check = false;
        });
        return this.check;
    }

    callbackFunction(response) {

        const token = response.token;

        if (token) {
            this.expireInDuration = response.expiresIn;
            // this.durationTimer = setTimeout(() => {
            //      this.logout();
            // }, expireInDuration * 1000);

            this.isAuthenticated = true;
            this.userId = response;
            this.isWorker = response.userId.IsWorker;
            this.isAadmin = response.userId.IsAdmin;
            this.status = response.userId.Active_status;
            console.log(this.isAadmin);
            this.authStatus.next(true);
            const now = new Date();
            const expirationDate = new Date( now.getTime() + this.expireInDuration * 1000);
            this.saveAuthDataInLocalStorage(token, expirationDate, this.userId );
            this.check = true;
            let returnUrl = localStorage.getItem('returnUrl');
            this.router.navigate([returnUrl]);
            alert('Successfully logged in...');
        } else {
            this.check = false;
        }
    }

    // session based checking for automatic login

    autoAuthUser() {
        const authInformation =  this.getAUthData();
        if (!authInformation) {
            return;
        }
        const now = new Date();
        const expiresIn = authInformation.expirationDate.getTime() - now.getTime();

     // if (expiresIn > 0) {
        this.token = authInformation.token;
        this.isAuthenticated = true;
        this.isWorker = authInformation.userId.userId.IsWorker;
        this.isAadmin = authInformation.userId.userId.IsAdmin;
        this.status = authInformation.userId.userId.Active_status;
        console.log(this.status);
        // this.status = authInformation.userId.userId.Active_status;
        console.log(this.isWorker);
        this.userId = authInformation.userId;
        console.log(this.userId);
        // this.setAuthTimer(expiresIn / 1000);
        this.authStatus.next(true);

        this.idd = {
            _id: this.userId.userId._id
        };

        if (this.isWorker) {

        this.http.post<{userId: any}>(this.serverRout + '/admin/workers/get', this.idd)
            .subscribe(res => {
                this.status = res.userId.Active_status;
                this.userId = res;

                console.log(this.status);
            });
        } else {
        if (navigator.geolocation) {
            // this.isTracking = true;
            navigator.geolocation.getCurrentPosition((position) => {
                console.log('in geo');
                console.log('position ', position);
                this.ob = {
                    _id: this.userId.userId._id,
                    Coordinate: {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                    }
                };
                console.log(this.ob);
                this.updateWorker(this.ob, this.updateUrl);
            });
            } else {
            console.log('error');
            alert('Geolocation is not supported by this browser.');
            }
        }
      // }
    }

    // creating a session

    // private setAuthTimer(duration: number) {
    // //     this.durationTimer = setTimeout(() => {
    // //         this.logout();
    // //    }, duration * 1000);
    // }

    // logout fuction

    logout() {
        this.token = null;
        this.isAuthenticated = false;
        this.isWorker = false;
        this.isAadmin = false;
        this.authStatus.next(false);
        clearTimeout(this.durationTimer);
        this.clearAuthDataInLocalStorage();
        this.userId = null;
        // this.router.navigate(['/']);
    }

    // saving auth information in localstorage of the device
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

    // getting auth info for login
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
