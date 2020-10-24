import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  serverRout = 'http://192.168.43.70:4444';
  updateUrl = this.serverRout + '/admin/users?_id=';
  getUrl = this.serverRout + '/admin/users';
  userpath = this.serverRout + '/admin/users/login';
  workerpath = this.serverRout + '/admin/workers/login';
  workerregister = this.serverRout + '/admin/workers/signup';
  userregister = this.serverRout + '/admin/users/signup';
  forgetPasswordUserPath = this.serverRout + '/admin/users/checkphone';
  forgetPasswordWorkerPath = this.serverRout + '/admin/workers/checkphone';

  constructor() { }
}
