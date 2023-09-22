import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginService} from "../../service/login.service";

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(public loginService: LoginService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.loginService.getToken() != null) {
      let newRequest = request.clone({
        headers: request.headers.set('Authorization', this.loginService.getToken())
      });
      return next.handle(newRequest);
    }
    return next.handle(request);
  }
}
