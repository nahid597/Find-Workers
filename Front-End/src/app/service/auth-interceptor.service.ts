import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {

  constructor(public authService: LoginService) {}

    intercept(req: HttpRequest<any> , next: HttpHandler) {
        const atuhToken = this.authService.getToken();
        const authRequest = req.clone({
            headers: req.headers.set('Authorization' , 'Bearer ' + atuhToken),
        });
        return next.handle(authRequest);
      }
}
