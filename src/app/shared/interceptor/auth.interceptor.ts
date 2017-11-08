import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {AuthService} from "../../core/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public inj: Injector) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const auth = this.inj.get(AuthService);

    request = request.clone({
      setParams: {
        token: auth.getToken()
      }
    });
    return next.handle(request);
  }
}
